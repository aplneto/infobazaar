from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .models.profile import Profile, MultiFactorCode
from .models.store import Wallet

@receiver(post_save, sender=User)
def create_user_profile(sender: ..., instance: User, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        Wallet.objects.create(user=instance)
        mfa = MultiFactorCode.objects.create(user=instance)
        mfa.reset_code()
        mfa.save()
        if instance.is_superuser or instance.is_staff:
            instance.profile.active = True
            instance.profile.save()
        else:
            # Enviar o e-mail com o 2FA para ativação
            mail_context = {
                "username": instance.username,
                "appname": settings.APPNAME,
                "code": mfa.code,
            }

            html_content = render_to_string(
                template_name="confirm_email.html", context=mail_context
            )
            plain_message = strip_tags(html_content)

            send_mail(
                subject="Account activation",
                message=plain_message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[instance.email,],
                html_message=html_content,
                fail_silently=False
            )