from django.urls import path
from .views.profile import flag, get_email, get_profile
from .views.auth import login, signup, validate_code, password_reset,\
    activate_account, request_password_reset
from .views.store import get_product_or_product_list, get_product_file, \
    buy_credits, get_receipt

urlpatterns = [
    path('profile/<str:username>', get_profile, name="profile"),
    path('email/<str:username>', get_email, name='list_profiles'),
    path('flag/', flag, name='get_profile'),
    path('login/', login, name="login"),
    path('signup/', signup, name="signup"),
    path("invitation_code/<str:code>", validate_code, name="validate_code"),
    path("reset/", request_password_reset, name="request_reset"),
    path("reset/<str:code>", password_reset, name="reset"),
    path("activate/<str:code>", activate_account, name="activate"),

    path("products/", get_product_or_product_list, name="product_list"),
    path("product/<int:pid>", get_product_or_product_list, name="product"),
    path("file/<int:fid>", get_product_file, name="product_file"),

    path("credits/", buy_credits, name="credits"),
    path("receipt/<str:uid>", get_receipt, name="receipt")
]