from django.db import models

# Create your models here.

class TV(models.Model):
    name = models.CharField(max_length=8)
    image = models.ImageField(upload_to='static')