"""
    Tests for posts app.
"""


from datetime import datetime

from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.test import TestCase

from .models import Image, Post


class PostModelTests(TestCase):
    """
    Tests for Post Model.
    """

    def setUp(self):
        """
        Setup function to create User.
        """
        User = get_user_model()
        self.user = User.objects.create_user(
            email="normal@user.com", password="foobar", dob=datetime.now().date()
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
