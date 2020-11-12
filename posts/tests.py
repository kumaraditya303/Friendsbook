# -*- coding: utf-8 -*-
"""
    Tests for posts app.
"""
from datetime import datetime
from io import BytesIO

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db import IntegrityError
from django.test import TestCase
import PIL
from .models import Image, Post


class PostModelTests(TestCase):
    """
    Tests for Post Model.
    """

    def setUp(self):
        """
        Setup function to create User and Image.
        """
        User = get_user_model()
        file = BytesIO()
        image = PIL.Image.new("RGB", size=(100, 100), color=(155, 0, 0))
        image.save(file, "jpeg")
        file.name = "test.jpeg"
        file.seek(0)
        self.image = SimpleUploadedFile(
            name="test.jpeg", content=file.read(), content_type="image/jpeg"
        )
        self.user = User.objects.create_user(
            email="normal@user.com",
            password="foobar",
            dob=datetime.now().date(),
            image=self.image,
        )

    def test_create_post(self):
        """
        Test for creating a Post.
        """
        post = Post.objects.create(
            user=self.user,
            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        )
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(post.user, self.user)
        self.assertEqual(
            post.content, "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
        )
        self.assertEqual(
            post.__str__(), "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
        )
        self.assertIsNotNone(post.created)
        with self.assertRaises(IntegrityError):
            Post.objects.create()
