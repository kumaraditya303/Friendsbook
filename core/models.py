from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.utils.translation import gettext as _


class User(AbstractUser):
    date_of_birth = models.DateField(
        default=False, help_text='Date of Birth', verbose_name=_('date of birth'))

    def __str__(self):
        return super().__str__()
