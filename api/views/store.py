import base64
import pickle

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404, get_list_or_404
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.html import strip_tags
from django.db.models import Q
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser

from uuid import uuid4

from ..models.store import Product, ProductFile, CreditPurchaseReceipt, \
    Receipt, ProductComment
from ..serializers.store import ProductSerializer, ProductFileSerializer, \
    CreditPurchaseSerializer, ProductPurchaseRequestSerializer, \
    ProductDisplaySerializer, FileUploadSerializer, \
    ProductCommentVisualizerSerializer
from ..crypto import encrypt

@api_view(["GET"])
def get_public_products(request: HttpRequest):
    products = Product.objects.filter(public=True)
    serializer = ProductDisplaySerializer(products, many=True)
    return Response(serializer.data, status=200)

@api_view(["GET"])
def get_product_id(request: HttpRequest, pid: int):
    p = get_object_or_404(Product, pk=pid)
    if p.user_has_access(request.user):
        serializer = ProductSerializer(p)
        return Response(serializer.data, status=200)
    else:
        return Response(status=403)

@api_view(["GET"])
def get_product_files(request: HttpRequest, pid: int):
    p = get_object_or_404(Product, pk=pid)
    if p.public or p.user_has_access(request.user):
        products = get_list_or_404(ProductFile, product=pid)
        serializer = ProductFileSerializer(products, many=True)
        return Response(serializer.data, status=200)
    return Response(status=403)

@login_required
@api_view(["GET"])
def get_my_products(request: HttpRequest):
    user_receipts_ids = Receipt.objects.filter(buyer=request.user)\
        .values_list("product", flat=True)
    
    purchased_products = Product.objects.filter(id__in=user_receipts_ids)
    authoral_products = Product.objects.filter(owner=request.user)

    products = purchased_products | authoral_products
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=200)

@login_required
@api_view(["GET"])
def get_product_file(_: HttpRequest, fid: int):
    product = get_object_or_404(ProductFile, pk=fid)
    serializer = ProductFileSerializer(product)
    return Response(serializer.data)

@login_required
@api_view(["POST"])
def buy_credits(request: HttpRequest):
    purchase = CreditPurchaseSerializer(data=request.data)
    if purchase.is_valid():
        request.user.wallet.balance += purchase.data["credits"]
        request.user.wallet.save()

        receipt = CreditPurchaseReceipt.objects.create(
            uuid=uuid4(),
            credits=purchase.data["credits"],
            value=purchase.data["value"],
            discount=purchase.data["discount"],
            user=request.user
        )
        receipt.save()

        mail_context = {
            "username": request.user.username,
            "credits": purchase.data["credits"],
            "uuid": receipt.uuid
        }
        html_content = render_to_string(
            template_name="credit_purchase_receipt_email.html",
            context=mail_context
        )
        plain_content = strip_tags(html_content)
        
        send_mail(
            subject = "Purchase receipt",
            message = plain_content,
            from_email = settings.EMAIL_HOST_USER,
            recipient_list = [request.user.email,],
            html_message = html_content,
            fail_silently=False,
            
        )
        return Response(status=200)
    else:
        return Response(status=400)

@api_view(["GET"])
def get_receipt(_: HttpRequest, uid: str):
    receipt = get_object_or_404(CreditPurchaseReceipt, uuid=uid)
    return Response({"receipt": receipt.generate_qr_code()}, status=200)

@login_required
@api_view(["GET"])
def get_balance(request: HttpRequest):
    balance = request.user.wallet.balance
    return Response({"credits": balance})

@login_required
@api_view(["POST"])
def purchase_product(request: HttpRequest):
    serializer = ProductPurchaseRequestSerializer(data=request.data)
    if serializer.is_valid():
        product = get_object_or_404(Product, id=serializer.data["product"])
        if (product.owner == request.user or \
            product.user_has_access(request.user)):
            return Response(status=403)
        if request.user.wallet.balance >= product.price:
            request.user.wallet.balance -= product.price
            request.user.wallet.save()
            receipt = Receipt(
                buyer=request.user,
                product=product,
                transaction_code=str(uuid4())
            )
            receipt.save()
            return Response(status=201)
        return Response("Not enough funds", status=403)
    return Response(status=400)

@api_view(["GET"])
def get_purchase_receipt(request: HttpRequest, ref: str):
    receipt = get_object_or_404(Receipt, transaction_code=ref)
    pickled_data = pickle.dumps(receipt)
    cipher_text = encrypt(
        pickled_data, settings.CRYPTO_KEY, settings.CRYPTO_NONCE
    )
    return Response(base64.urlsafe_b64encode(cipher_text))

@login_required
@api_view(["POST"])
def register_new_product(request: HttpRequest):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        pdata = serializer.data.copy()
        pdata["owner"] = request.user
        del pdata["categories"]
        new_product = Product.objects.create(**pdata)
        new_product.categories.set(serializer.data["categories"])
        new_product.save()
        return Response(status=201)
    return Response(status=400)

@login_required
@api_view(["POST"])
@parser_classes([MultiPartParser])
def upload_file_to_project(request: HttpRequest):
    serializer = FileUploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(status=400)


@api_view(["GET"])
def get_products_by_user(request: HttpRequest, username: str):
    user = get_object_or_404(User, username=username)
    # products = Product.objects.filter(Q(owner=user)|Q(public=True))
    if (user == request.user):
        products = get_list_or_404(Product, owner=user)
    else:
        products = get_list_or_404(Product, owner=user, public=True)
    serializer = ProductDisplaySerializer(products, many=True)
    return Response(serializer.data, status=200)

@api_view(["GET"])
def get_product_comments(request: HttpRequest, pid: int):
    products = get_list_or_404(ProductComment, product=pid)
    serializer = ProductCommentVisualizerSerializer(products, many=True)
    return Response(serializer.data, status=200)