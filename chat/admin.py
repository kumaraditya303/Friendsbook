# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Chat, Message, Participant

admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Participant)
