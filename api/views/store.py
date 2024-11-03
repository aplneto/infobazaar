from django.shortcuts import HttpResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.html import strip_tags
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view

from uuid import uuid4

from ..models.store import Product, ProductFile, CreditPurchaseReceipt
from ..serializers.store import ProductSerializer, ProductFileSerializer, \
    CreditPurchaseSerializer

@login_required
@api_view(["GET"])
def get_product_or_product_list(_: HttpRequest, pid: int = None):
    if pid:
        serializer = ProductSerializer(get_object_or_404(Product, pk=pid))
    else:
        products = Product.objects.filter(public=True)
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
            "receipt": reverse("receipt", uid=receipt.uuid)
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
        print(purchase.data)
        return Response(status=400)

@api_view(["GET"])
def get_receipt(_: HttpRequest, uid: str):
    receipt = get_object_or_404(CreditPurchaseReceipt, uuid=uid)
    return Response({"receipt": receipt.generate_qr_code()}, status=200)