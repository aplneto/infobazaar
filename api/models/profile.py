from django.db import models
from django.contrib.auth.models import User

from random import randint

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    credits = models.PositiveIntegerField(default=0)
    avatar = models.ImageField(default="default-profile.jpeg")
    active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s profile"

class InvitationCode(models.Model):
    code = models.CharField(max_length=64, blank=True, primary_key=True)
    def __str__(self):
        return self.code

class MultiFactorCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    code = models.CharField(max_length=6)

    def reset_code(self):
        self.code = ''.join([str(randint(0, 9)) for _ in range(6)])
        self.active = True
    
    def __str__(self):
        return f"{self.user.username}: {self.code if self.active else '000000'}"
