from django.db import models
from companies.models import Company


UNIT_CHOICES = [
    ("kg", "kg"),
    ("bag", "bag"),
    ("mtr", "mtr"),
    ("nos", "nos"),
]


class Product(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    opening = models.FloatField(default=0)
    unit = models.CharField(max_length=500, choices=UNIT_CHOICES)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
