from django.urls import path
from .views.profile import flag, get_email, get_profile, get_my_profile
from .views.auth import login, signup, validate_code, password_reset,\
    activate_account, request_password_reset, make_logout
from .views.store import get_product_or_product_list, get_product_file, \
    buy_credits, get_receipt, get_balance, get_my_products, purchase_product, \
    get_purchase_receipt, register_new_product

urlpatterns = [
    # Profile related endpoints
    path('me/', get_my_profile, name="me"),
    path('profile/<str:username>', get_profile, name="profile"),
    path('email/<str:username>', get_email, name='list_profiles'),
    path('flag/', flag, name='get_profile'),
    path('login/', login, name="login"),
    path("logout/", make_logout, name="logout"),
    path('signup/', signup, name="signup"),
    path("invitation_code/<str:code>", validate_code, name="validate_code"),
    path("reset/", request_password_reset, name="request_reset"),
    path("reset/<str:code>", password_reset, name="reset"),
    path("activate/<str:code>", activate_account, name="activate"),

    # Product related endpoints
    path("products/", get_product_or_product_list, name="product_list"),
    path("products/mine/", get_my_products, name="my_products"),
    path("product/<int:pid>", get_product_or_product_list, name="product"),
    path("file/<int:fid>", get_product_file, name="product_file"),
    path("buy/", purchase_product, name="purchase_product"),
    path("purchase/<str:ref>", get_purchase_receipt, name="purchase_receipt"),
    path("product/new/", register_new_product, name="new_product"),

    # Wallet related entpoins
    path("credits/", buy_credits, name="credits"),
    path("receipt/<str:uid>", get_receipt, name="receipt"),
    path("balance/", get_balance, name="balance"),
]