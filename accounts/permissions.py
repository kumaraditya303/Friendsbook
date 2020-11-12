# -*- coding: utf-8 -*-
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadonly(BasePermission):
    """
    Custom Permission to allow only the user to change their accounts.
    """

    def has_object_permission(self, request, view, obj) -> bool:

        return request.method in SAFE_METHODS or obj.owner == request.user
