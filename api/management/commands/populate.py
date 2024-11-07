import datetime
import json
import os
import time
import uuid

from api.models.profile import Profile, InvitationCode, MultiFactorCode
from api.models.store import Category, Product, Receipt, Wallet, \
    ProductComment
from api.models.messages import Message
from django.core.management import BaseCommand
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models import Model
from random import random

DATA_ROOT = settings.BASE_DIR / 'data/'

def str_time_prop(start, end, time_format, prop):
    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))

    ptime = stime + prop * (etime - stime)

    return ptime
    

class Command(BaseCommand):
    help = "Populates the database with the chatGPT generated mock data"

    def handle(self, *args, **kwargs):
        if (User.objects.count() > 0):
            print("Database already popylated!")
            return
        with open(DATA_ROOT / "invitation.json", 'r') as invites_json:
            invites_array = json.load(invites_json)
            InvitationCode.objects.bulk_create(
                [InvitationCode(code=c) for c in invites_array]
            )
        
        
        all_users = []
        with open(DATA_ROOT / "users.json", 'r') as users_json:
            user_array = json.load(users_json)
        
            for user in user_array:
                u = User(**user)
                all_users.append(u)
                u.set_password(user['password'])
        User.objects.bulk_create(all_users)
        print(f"{len(all_users)} users added to db!")

        with open(DATA_ROOT / "balance.json", 'r') as balance_json:
            balance_array = json.load(balance_json)
            for b in balance_array:
                w = Wallet(
                    user = all_users[b["user_id"] -1],
                    balance = b["balance"]
                )
                w.save()

        all_profiles = []
        all_mfa = []
        with open(DATA_ROOT / "profiles.json", 'r') as profiles_json:
            profiles_array = json.load(profiles_json)

            for profile in profiles_array:
                p = Profile(
                    user=all_users[profile["user"] -1],
                    bio=profile["bio"],
                    active=profile["active"]
                )
                m = MultiFactorCode(user=p.user)
                m.reset_code()
                if p.active:
                    m.active = False
                all_mfa.append(m)
                all_profiles.append(p)
        Profile.objects.bulk_create(all_profiles)
        MultiFactorCode.objects.bulk_create(all_mfa)
        print(f"{len(all_profiles)} profiles added to db!")

        categories = ["malware", "leak", "service", "tool", "hiring"]
        Category.objects.bulk_create([
            Category(name=category) for category in categories
        ])
        print(f"{len(categories)} categories added to db!")

        with open(DATA_ROOT / "products.json", 'r') as products_json:
            products_array = json.load(products_json)
            for p in products_array:
                product = Product(
                    owner=all_users[p["owner"]-1],
                    price=p["price"],
                    description=p['description'],
                    title=p['title'],
                    public=p['public'],
                    last_updated=datetime.datetime.strptime(
                        p['last_update'], "%Y-%m-%d"
                    ),
                )
                product.save()
                product.categories.add(Category.objects.get(pk=p['categories']))
                product.save()

        
        all_comments = []
        all_receipts = []
        with open(DATA_ROOT / "receipts.json", 'r') as receipts_json:
            receipts_array = json.load(receipts_json)
            for r in receipts_array:
                p = Product.objects.get(title=r['product']),
                if (isinstance(p, tuple)):
                    p = p[0]
                _t = str_time_prop( 
                    "01/11/2024 12:00 AM",
                    "06/11/2024 11:59 PM",
                    "%d/%m/%Y %I:%M %p",
                    random()
                )
                comment = ProductComment(
                    author = all_users[r['buyer'] -1],
                    content = r['message'],
                    product = p,
                    created_at = _t
                )
                all_comments.append(comment)
                try:
                    receipt = Receipt(
                        product = Product.objects.get(title=r['product']),
                        message = r['message'],
                        buyer = all_users[r['buyer'] - 1],
                        transaction_code = str(uuid.uuid4()),
                        bought_at = _t
                    )
                    receipt.save()
                except:
                    pass

                all_receipts.append(receipt)
        
        ProductComment.objects.bulk_create(all_comments)

        all_messages = []
        with open(DATA_ROOT / "messages.json", 'r') as messages_json:
            messages_aray = json.load(messages_json)
            for message in messages_aray:
                m = Message(content = json.dumps(message))
                all_messages.append(m)
        
        Message.objects.bulk_create(all_messages)
    
    @staticmethod
    def check_existent_records(model: Model):
        return model.objects.count() > 0