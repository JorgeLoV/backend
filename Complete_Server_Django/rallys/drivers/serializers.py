from rest_framework import serializers
from .models import Drivers

class DriversSerializer(serializers.ModelsSerializer):
    class Meta:
        model = Drivers
        fields = ['pk', 'driver', 'co_driver', 'driver_countr', 'co_driver_country']