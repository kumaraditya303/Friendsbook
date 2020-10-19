from rest_framework.serializers import ModelSerializer

from .models import Image, Post


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = (
            "id",
            "image",
            "created",
        )
        extra_kwargs = {
            "created": {"read_only": True},
        }


class PostSerializer(ModelSerializer):
    images = ImageSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = (
            "id",
            "content",
            "created",
            "images",
        )
        extra_kwargs = {
            "created": {"read_only": True},
        }

    def create(self, validated_data):
        images = self.context.get("view").request.data
        post = Post.objects.create(**validated_data)
        if images:
            for image in images.values():
                Image.objects.create(post=post, image=image)
        return post
