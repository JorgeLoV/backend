from django.db import models

class Cars(models.Model):
    brand = models.CharField(max_lenght=100)
    model = models.CharField(max_length=100)
    engine = models.CharField(max_length=100)
    hp = models.IntegerField()

    def __str__(self):
        return self.brand
