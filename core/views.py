from django.contrib.auth import get_user_model
from django.shortcuts import render
# Create your views here.
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import UserSerializer


class UserCreateAPIView(CreateAPIView):
    model = get_user_model()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
