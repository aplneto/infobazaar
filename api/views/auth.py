from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.contrib import auth
from django.contrib.auth.models import User
from django.db.models import Q
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from rest_framework.request import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..serializers.profile import LoginSerializer, UserSerializer, \
    PasswordResetSerializer
from ..models.profile import InvitationCode, MultiFactorCode


@api_view(['POST'])
def login(request: HttpRequest):
    '''
    Função que controla o fluxo de login da aplicação
    '''
    login_data = LoginSerializer(data=request.data)
    if login_data.is_valid():
        user = auth.authenticate(
            request,
            username=login_data.data["username"],
            password=login_data.data["password"]
        )
        if user and user.profile.active:
            auth.login(request, user)
            return Response(status=200)
        else:
            return Response("Unauthorized", status=403)
    return Response("Bad request", status=400)

@api_view(["PUT"])
def signup(request: HttpRequest):
    '''
    Função que controla o fluxo de registro
    '''
    user_data = UserSerializer(data=request.data)
    if user_data.is_valid():
        users = User.objects.filter(
            Q(email=user_data.data["email"]) | 
            Q(username=user_data.data["username"])
        )
        if (users.count() > 0):
            return Response("Unauthorized", 401)
        User.objects.create_user(**user_data.data)
        return Response("Created", 201)
    return Response("Bad Request", status=400)

@api_view(["GET"])
def validate_code(_: HttpRequest, code: str):
    '''
    Função que valida se um invitation code existe
    '''
    get_object_or_404(InvitationCode, code=code)
    return Response(status=200)

@api_view(["POST"])
def request_password_reset(request: HttpRequest):
    '''
    Função responsável por enviar o e-mail de reset de senha
    '''
    username = request.data["username"]
    email = request.data["email"]
    user = get_object_or_404(
        User, username=username, is_superuser=False, is_staff=False
    )
    user.multifactorcode.reset_code()
    user.multifactorcode.save()
    # Send password reset e-mail
    mail_context = {
        "username": username,
        "code": user.multifactorcode.code
    }
    # Add flag if account is being taken over
    if user.email != email:
        f = "cbefc39013cc57b03712e0b4bdd2029d04a7d9bbb1d0d31f16664bc920b37f2c"
        mail_context["flag"] = f

    html_content = render_to_string(
        "recovery_email.html", context=mail_context
    )
    plain_content = strip_tags(html_content)
    send_mail(
        subject="Password recovery",
        message=plain_content,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email,],
        html_message=html_content,
        fail_silently=False
    )
    return Response(status=200)

@api_view(["POST"])
def password_reset(request: HttpRequest, code: str):
    '''
    Fluxo do reset de senha
    '''
    mfa = get_object_or_404(MultiFactorCode, code=code)
    reset = PasswordResetSerializer(data=request.data)
    if reset.is_valid():
        user = get_object_or_404(User, username=reset.data["username"])
        if (mfa.user == user):
            user.set_password(reset.data["password"])
            mfa.active = False
            user.save()
            mfa.save()
            return Response(status=200)
    return Response("Foribdden", status=403)

@api_view(["POST"])
def activate_account(request: HttpRequest, code: str):
    '''
    Fluxo da ativação de conta
    '''
    mfa = get_object_or_404(MultiFactorCode, code=code)
    user = get_object_or_404(User, username=request.data["username"])
    if (mfa.user == user):
        mfa.active = False
        mfa.save()
        user.profile.active = True
        user.profile.save()
        return Response(status=200)
    return Response("Forbidden", status=403)