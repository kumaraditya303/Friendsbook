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
    images = ImageSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = ("content", "created", "images")
        extra_kwargs = {
            "created": {"read_only": True},
        }

    def create(self, validated_data):
        images = validated_data.pop("images", None)
        post = Post.objects.create(**validated_data)
        if images:
            for image in images:
                Image.objects.create(post=post, **image)
        return post

