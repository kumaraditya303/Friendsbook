"""
    URL Configuration for Accounts app.
"""
from django.urls import path

from .views import PostsListAPIView, ImagesListAPIView

urlpatterns = [
    path("list/", PostsListAPIView.as_view()),
    path("lisst/", ImagesListAPIView.as_view()),
]
