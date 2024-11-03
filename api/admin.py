from django.contrib import admin
from .models.profile import Profile, InvitationCode, MultiFactorCode
# Register your models here.

admin.site.register([Profile, InvitationCode, MultiFactorCode])