from django.contrib.auth import get_user_model
from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.validators import UniqueTogetherValidator


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'is_staff')
        extra_kwargs = {'password': {'write_only': True},
                        'is_staff': {'read_only': True}}
        validators = [
            UniqueTogetherValidator(
                queryset=get_user_model().objects.all(),
                fields=['email', ]
            )
        ]
