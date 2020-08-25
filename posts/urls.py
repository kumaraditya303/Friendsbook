"""
    URL Configuration for Accounts app.
"""
from django.urls import path

from .views import PostCreateAPIView

urlpatterns = [
    path("post/create/", PostCreateAPIView.as_view()),
]
