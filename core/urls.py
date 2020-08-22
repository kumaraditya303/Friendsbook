"""
    Core URL Configuration
"""
from django.urls import path
from rest_framework.authtoken import views

from core.views import LogoutAPIView, UserCreateAPIView

urlpatterns = [
    path('login/', views.obtain_auth_token),
    path('register/', UserCreateAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view())
]
