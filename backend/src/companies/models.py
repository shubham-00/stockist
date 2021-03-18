from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
