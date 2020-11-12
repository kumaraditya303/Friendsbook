# -*- coding: utf-8 -*-
from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext as _


class Post(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="posts"
    )
    content = models.TextField(_("content"))
    created = models.DateTimeField(_("created"), auto_now=True)

    class Meta:
        ordering = ["-created"]
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")

    def __str__(self):
        return f"{self.content}"


class Image(models.Model):
    image = models.ImageField(_("image"), upload_to="images")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    created = models.DateTimeField(_("created"), auto_now=True)

    class Meta:
        ordering = ["-created"]
        verbose_name = _("Image")
        verbose_name_plural = _("Images")

    def __str__(self):
        return self.image.url
