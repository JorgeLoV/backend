from django.shortcuts import render
from rest_framework import generics
from .models import Drivers
from serializers import DriversSerializer
from rest_framework.response import Response

class DriverListCreate(generics.ListCreateAPIView):
    queryset = Drivers.objects.all()
    serializer_class = DriversSerializer

class DriversView(generics.CreateAPIView):
    queryset = Drivers.objects.all()
    serializer_class = DriversSerializer

class DriversUpdate(generics.UpdateAPIView):
    queryset = Drivers.objects.all()
    serializer_class = DriversSerializer

class DriversDelete(generics.DeleteAPIView):
    queryset = Drivers.objects.all()
    serializer_class = DriversSerializer

# API View propia

class DriverListCreate(APIView):

    def get(self, request):
        drivers = Drivers.objects.all()
        serializaer = DriversSerializer(drivers, many = True)
        return Response(serializaer.data)

    def post(self, request):
        serializer = DriversSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 200)