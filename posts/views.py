from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import Image, Post
from .serializers import ImageSerializer, PostSerializer


class PostsListAPIView(ListAPIView):
    queryset = Post.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PostSerializer


class ImagesListAPIView(ListAPIView):
    queryset = Image.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ImageSerializer
