from django.contrib import admin
from .models.profile import Profile, InvitationCode, MultiFactorCode
from .models.store import Product, Wallet, ProductFile, Category, \
    CreditPurchaseReceipt
# Register your models here.

admin.site.register([Profile, InvitationCode, MultiFactorCode])
admin.site.register(
    [Product, Wallet, ProductFile, Category, CreditPurchaseReceipt]
)