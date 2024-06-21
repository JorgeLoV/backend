from rest_framework import serializers
from .models import Cars

class CarsSerializer(serializers.ModelsSerializer):
    class Meta:
        model = Cars
        fields = ['pk', 'brand', 'model', 'hp']