from rest_framework import viewsets
from .models import Drivers
from .serializer import DriversSerializer

class DriversViewSet(viewsets.ModelViewSet):
    queryset = Drivers.objects.all()
    serializer_class = DriversSerializer
    lookup_field = 'pk'