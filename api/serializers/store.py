from rest_framework import serializers
from ..models.store import Category, Product, ProductFile, Receipt

class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(read_only=True, slug_field="username")
    class Meta:
        model = Product
        fields = [
            "owner", "price", "description", "title", "categories", "public"
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]

class ProductFileSerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(read_only=True, slug_field="title")
    class Meta:
        model = ProductFile
        fields = "__all__"

class CreditPurchaseSerializer(serializers.Serializer):
    credits = serializers.IntegerField()
    value = serializers.IntegerField()
    discount = serializers.FloatField(default=0)

    def validate(self, attrs):
        if attrs['discount'] > 1 or attrs['discount'] < 0:
            raise serializers.ValidationError("Discount value is invalid")
        return super().validate(attrs)

class ProductPurchaseRequestSerializer(serializers.Serializer):
    product = serializers.IntegerField(allow_null = False)

class ReceiptSerializer(serializers.ModelSerializer):
    buyer = serializers.SlugRelatedField(read_only=True, slug_field="username")
    product = serializers.SlugRelatedField(read_only=True, slug_field="title")

    class Meta:
        model = Receipt
        fields = "__all__"