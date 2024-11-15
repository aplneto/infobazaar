import base64
import json
import io
import qrcode

from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s ${self.balance}"

class Category(models.Model):
    name = models.CharField(primary_key=True, max_length=25)
    def __str__(self):
        return self.name

class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    price = models.PositiveIntegerField(default=0)
    description = models.TextField(max_length=800, blank=True)
    title = models.CharField(max_length=100, blank=False)
    public = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.owner != None:
            return f"{self.owner.username}'s {self.title}: ${self.price}"
        else:
            return f"{self.title}: ${self.price}"
    
    def user_has_access(self, user: User) -> bool:
        if self.owner == user or self.public:
            return True
        
        try:
            Receipt.objects.get(buyer=user, product=self)
        except Receipt.DoesNotExist:
            return False
        else:
            return True

class ProductFile(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    file = models.FileField(upload_to="project_files/")
    description = models.TextField(max_length=200, blank=True)

    class Meta:
        unique_together = (('product', 'id'))

    def __str__(self):
        return f"{self.file.name}"

class Receipt(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    transaction_code = models.CharField(max_length=36)
    bought_at = models.DateField(auto_now_add=True)
    message = models.CharField(max_length=400, blank=True)

    class Meta:
        unique_together = ('product', 'buyer')

    def __str__(self):
        return self.transaction_code

class CreditPurchaseReceipt(models.Model):
    uuid = models.CharField(primary_key=True, max_length=36)
    credits = models.PositiveIntegerField(default=0)
    value = models.PositiveIntegerField(default=0)
    discount =models.FloatField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(1)]
    )
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def generate_qr_code(self):
        f = "8438bc689a96c8da258b19ac8f8daf823e6cb72a63732f3f68a12a825884bd60"
        purchase_info = {
            "id": self.uuid,
            "credits": self.credits,
            "value": self.value,
            "discount": self.discount,
            "user": self.user.username,
            "flag": "TAC{baby-you-re-a-rich-man:" + f + "}",
        }
        code = qrcode.make(json.dumps(purchase_info))
        image_bytes = io.BytesIO()
        code.save(image_bytes, format="png")
        return base64.b64encode(image_bytes.getvalue()).decode()

class ProductComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=400)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
