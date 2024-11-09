from django.core.mail.backends.smtp import EmailBackend

class RestrictedDomainEmailBackend(EmailBackend):
    def send_messages(self, email_messages):
        valid_messages = []
        
        for message in email_messages:
            for recipient in message.to:
                if '@attacker.local' not in recipient:
                    return 0
            valid_messages.append(message)

        if valid_messages:
            return super().send_messages(valid_messages)
        
        return 0
