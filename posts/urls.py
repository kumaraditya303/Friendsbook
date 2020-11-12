# -*- coding: utf-8 -*-
"""
    URL Configuration for posts app.
"""
from django.urls import path

from .views import PostListAPIView, PostCreateAPIView

urlpatterns = [
    path("post/", PostListAPIView.as_view()),
    path("post/create/", PostCreateAPIView.as_view()),
]
