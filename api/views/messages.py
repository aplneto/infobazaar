from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.request import HttpRequest
from rest_framework.response import Response

from ..serializers.messages import MessageSerializer
from ..models.messages import Message

@api_view(["POST"])
def post_secure_message(request: HttpRequest):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        msg = serializer.save()
        return Response({"uuid": msg.uuid}, status=201)
    return Response(status=400)

@api_view(["GET"])
def read_secure_message(request: HttpRequest, uid: str):
    message = get_object_or_404(Message, pk=uid)
    return Response(message.content, status=200)
    