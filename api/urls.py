from django.urls import path
from .views.profile import flag, get_email
from .views.auth import login, signup, validate_code, password_reset,\
    activate_account, request_password_reset

urlpatterns = [
    path('email/<str:username>', get_email, name='list_profiles'),
    path('flag/', flag, name='get_profile'),
    path('login/', login, name="login"),
    path('signup/', signup, name="signup"),
    path("invitation_code/<str:code>", validate_code, name="validate_code"),
    path("reset/", request_password_reset, name="request_reset"),
    path("reset/<str:code>", password_reset, name="reset"),
    path("activate/<str:code>", activate_account, name="activate")
]