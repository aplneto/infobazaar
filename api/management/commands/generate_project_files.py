import os
import sys
import uuid

from django.conf import settings
from django.core.management import BaseCommand
from io import BytesIO
from random import randint
from django.core.files.base import ContentFile

from api.models.store import Product, ProductFile

DATA_ROOT = settings.BASE_DIR / 'data/'

def create_mock_binary_file(skip_header):
    f = "cbfb10d180bb1ce4334d1f1c69ce119a70658ba0ac5f0b9c381103b2a2e24be1"
    header = "TAC{unholy:" + f +"}"
    size_kb = randint(256, 1024)
    if skip_header:
        return BytesIO(os.urandom(size_kb * 124))
    return BytesIO(header.encode() + os.urandom((size_kb * 1024) - len(header)))

class Command(BaseCommand):
    help = "Populates the filebase with random mock data files"

    def handle(self, *args, **kwargs):
        for product in Product.objects.all():
             if (product.categories.contains("malware") \
                or product.categories.contains("tool")):
                   for _ in range(randint(1, 3)):
                         pf = ProductFile(
                            product=product,
                            description=product['description']
                        )
                         fname = product['title'].strip(" ") + str(uuid.uuid4())
                         contents = create_mock_binary_file(product["public"])\
                            .getvalue()
                         pf.file.save(fname, ContentFile(contents))
                         pf.save()

        
        sys.stdout.write(
            self.style.SUCCESS(f"Sucessfully added files to the products")
        )
                        