from django.shortcuts import render
from rest_framework import generics
from .models import Cars
from serializers import CarsSerializer
from rest_framework.response import Response

class CarsListCreate(generics.ListCreateAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer

class CarView(generics.CreateAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer

class CarsUpdate(generics.UpdateAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer

class CarsDelete(generics.DeleteAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer


# API View propia

class CarsListCreate(APIView):

    def get(self, request):
        cars = Cars.objects.all()
        serializaer = CarsSerializer(cars, many = True)
        return Response(serializaer.data)

    def post(self, request):
        serializer = CarsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 200)