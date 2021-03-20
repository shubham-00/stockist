from django.contrib.auth.models import User
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)

    def validate_username(self, username):
        queryset = User.objects.filter(username=username)
        if not queryset.exists():
            raise serializers.ValidationError("Invalid username or password!")
        return username
