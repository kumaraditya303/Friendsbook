from datetime import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.shortcuts import reverse


class UserManagerTests(TestCase):
    """
    Tests for User Manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def test_create_user(self):
        """
        Test for creating a normal user.
        """
        User = get_user_model()
        user = User.objects.create_user(
            email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertIsNone(user.username)
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        """
        Test for creating a super user.
        """
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertEqual(admin_user.__str__(), 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        self.assertIsNone(admin_user.username)
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_staff=False)


class UserTests(APITestCase):
    """
    Tests for user events as user registration, login and logout.
    """

    def test_register(self):
        """
        Test for user registration.
        """
        User = get_user_model()
        response = self.client.post(reverse('api:register'),
                                    {
            'first_name': 'test',
                                        'last_name': 'user',
                                        'email': 'test@test.com',
                                        'password': 'foobar',
                                        'dob': datetime.now().date()
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'test@test.com')
        self.assertTrue(User.objects.get().is_active)
        self.assertFalse(User.objects.get().is_staff)
        self.assertFalse(User.objects.get().is_superuser)
        response = self.client.post(reverse('api:register'),
                                    {
                                        'first_name': 'test',
                                        'last_name': 'user',
                                        'email': 'test@test.com',
                                        'password': 'foobar'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotEqual(User.objects.count(), 2)
        response = self.client.post(reverse('api:register'),
                                    {
                                        'email': '',
                                        'password': 'foobar'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotEqual(User.objects.count(), 2)
        response = self.client.post(reverse('api:register'),
                                    {
                                        'email': 'test@test.com',
                                        'password': ''
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotEqual(User.objects.count(), 2)

    def test_login(self):
        """
        Test for user login.
        """
        User = get_user_model()
        self.test_register()
        response = self.client.post(reverse('api:login'), {
            "username": 'test@test.com',
            'password': 'foobar'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Token.objects.count(), 1)
        self.assertEqual(Token.objects.get().key,
                         User.objects.get().auth_token.key)
        self.assertEqual(Token.objects.get().key, response.data['token'])
        response = self.client.post(reverse('api:login'), {
            "username": 'falsetest@test.com',
            'password': 'foo'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotEqual(Token.objects.count(), 2)

    def test_logout(self):
        """
        Test for user logout.
        """
        self.test_login()
        User = get_user_model()
        response = self.client.get(reverse('api:logout'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Token.objects.count(), 1)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Token {User.objects.get().auth_token.key}')
        response = self.client.get(reverse('api:logout'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(Token.objects.count(), 1)
