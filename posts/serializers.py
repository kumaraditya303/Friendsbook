from rest_framework.serializers import ModelSerializer
from .models import Image, Post


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ("image", "created")
        extra_kwargs = {
            "created": {"read_only": True},
        }


class PostSerializer(ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Post
        fields = ("content", "created", "images")
        extra_kwargs = {
            "created": {"read_only": True},
        }
