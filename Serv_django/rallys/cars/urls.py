from django.urls import path
from .views import CarsListCreate

urlpatterns = [
    path('cars/', CarsListCreate.as_view(), name = 'car_list_create')
]