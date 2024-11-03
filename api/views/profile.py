from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_email(_: HttpRequest, username: str):
    user = get_object_or_404(User, username=username)
    return Response({"email": user.email})

@api_view(['GET'])
def flag(_: HttpRequest):
    f = "5434ff051aa72bf58a998aded8b5a0b8c6df8ae1493c245dc0aeadcc124fb53a"
    return Response(f'<flag challenge="Welcome to the jungle">{f}</flag>')