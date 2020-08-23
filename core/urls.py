"""
    Core URL Configuration
"""
from django.urls import path
from rest_framework.authtoken import views

from core.views import LogoutAPIView, UserCreateAPIView, UserObtainToken

urlpatterns = [
    path('login/',  UserObtainToken.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]
