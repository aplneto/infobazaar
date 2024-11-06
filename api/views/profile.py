from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..serializers.profile import ProfileSerializer

@api_view(['GET'])
def get_email(_: HttpRequest, username: str):
    user = get_object_or_404(
        User, username=username, is_superuser=False, is_staff=False
    )
    return Response({"email": user.email})

@api_view(['GET'])
def flag(_: HttpRequest):
    f = "5434ff051aa72bf58a998aded8b5a0b8c6df8ae1493c245dc0aeadcc124fb53a"
    return Response("TAC{welcome-to-the-jungle:" + f + "}")

@api_view(["GET"])
def get_profile(request: HttpRequest, username: str):
    user = get_object_or_404(
        User,
        username=username
    )
    return Response(
        ProfileSerializer(user.profile, context={'request': request}).data
    )

@login_required
@api_view(["GET"])
def get_my_profile(request: HttpRequest):
    if request.user.is_authenticated:
        return Response({"username": request.user.username})