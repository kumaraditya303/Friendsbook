"""
    Core API Views
"""
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import UserSerializer


class UserCreateAPIView(CreateAPIView):
    """
    API View for User registration.
    """
    model = get_user_model()
    permission_classes = [AllowAny, ]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        super().post(request, *args, **kwargs)
        return Response(status=status.HTTP_201_CREATED)


class LogoutAPIView(APIView):
    """
    API View for User logout.
    """
    permission_classes = [IsAuthenticated, ]

    def get(self, request, **kwargs):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserObtainToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(token.user).data
        })
