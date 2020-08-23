from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueTogetherValidator


class UserSerializer(ModelSerializer):
    """
    User model serializer where email is the unique identifier
    for authentication instead of usernames.
    """

    def create(self, validated_data):
        """
        Function to create User.
        """
        user = get_user_model().objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'password', 'dob')
        extra_kwargs = {'password': {'write_only': True}, }
