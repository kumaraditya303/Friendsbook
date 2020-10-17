from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post
from .serializers import PostSerializer


class PostListAPIView(ListAPIView):
    permission_classes = [
        AllowAny,
    ]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateAPIView(CreateAPIView):
    authentication_classes = [
        TokenAuthentication,
    ]
    permission_classes = [IsAuthenticated]
    model = Post
    serializer_class = PostSerializer
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)
