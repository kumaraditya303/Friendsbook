"""
    Core API Views
"""
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


class UserCreateAPIView(CreateAPIView):
    model = get_user_model()
    permission_classes = [AllowAny, ]
    serializer_class = UserSerializer


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, **kwargs):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
