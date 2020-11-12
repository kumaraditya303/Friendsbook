# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer

from .models import Image, Post
from accounts.serializers import UserSerializer
import uuid


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ("id", "image", "created")
        extra_kwargs = {"created": {"read_only": True}}


class PostSerializer(ModelSerializer):
    images = ImageSerializer(many=True, required=False)
    user = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Post
        fields = ("id", "content", "created", "images", "user")
        extra_kwargs = {"created": {"read_only": True}}

    def create(self, validated_data):
        images = self.context.get("view").request.FILES
        post = Post.objects.create(**validated_data)
        if images:
            for image in images.values():
                image._set_name(str(uuid.uuid4()))
                Image.objects.create(post=post, image=image)
        return post
