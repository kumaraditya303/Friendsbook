from django.core.checks import messages
from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import User


class Participant(models.Model):

    user: User = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    friends = models.ManyToManyField("self", blank=True)

    def __str__(self) -> str:
        return self.user.email


class Message(models.Model):

    participant = models.ForeignKey(
        Participant, related_name="messages", on_delete=models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        self.participant.user.email


class Chat(models.Model):
    participants = models.ManyToManyField(Participant, related_name="chats", blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self) -> str:
        return f"{self.pk}"