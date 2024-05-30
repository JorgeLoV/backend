from django.db import models

class Drivers(models.Model):
    driver = models.CharField(max_length=100)
    co_driver = models.CharField(max_length=100)
    driver_country = models.CharField(max_length=100)
    co_driver_country = models.CharField(max_length=100)

# Create your models here.
