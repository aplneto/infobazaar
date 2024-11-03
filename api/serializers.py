from django.contrib.auth.models import User
from rest_framework import serializers


from .models.profile import Profile, InvitationCode

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class InvitationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitationCode
        fields = "__all__"

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(required=True, allow_blank=False)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(required=True, allow_blank=False)
    username = serializers.CharField(required=True, allow_blank=False)