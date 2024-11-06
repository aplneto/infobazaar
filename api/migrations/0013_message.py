# Generated by Django 5.1.2 on 2024-11-06 05:14

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_receipt_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('uuid', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('content', models.TextField(max_length=400)),
            ],
        ),
    ]
