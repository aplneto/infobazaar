import base64

from django.db import models
from django.conf import settings
from uuid import uuid4
from ..crypto import encrypt

class Message(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid4, editable=False, auto_created=True
    )
    content = models.TextField(max_length=400)

    def encrypt(self):
        b = encrypt(self.content.encode(), settings.CRYPTO_KEY, settings.CRYPTO_NONCE)
        self.content = base64.urlsafe_b64encode(b).decode()
        self.save()