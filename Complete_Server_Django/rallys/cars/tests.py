from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Cars
from .serializers import CarsSerializer

class CarsAPITest(APITestCase):
    def setUp(self):
        self.car1 = Cars.objects.create(brand='Audi', nodel='Quattro A1', hp='370')
        self.car2 = Cars.objects.create(brand='Lancia', model='037', hp='300')
        self.url = reverse('cars')

    def test_get_cars(self):
        response = self.client.get(self.url)
        cars = Cars.objects.all()
        serializer = CarsSerializer(cars, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.asserEqual(response.data, serializer.data)

    def test_create_car(self):
        data = {
            'brand': 'Renault',
            'model': '5 Turbo',
            'hp': '350'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cars.objects.count(), 3)
        self.assertEqual(Cars.objects.get(id=response.data['id']).brand, 'Renault')

    def test_update_car(self):
        update_url = reserve('cars', kwargs={'pk': self.car1.pk})
        data = {
            'brand': 'Audi',
            'model': 'Quattro A1',
            'hp': '370'
        }
        response = self.client.put(update_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.car1.refresh_from_db()
        self.assertEqual(self.car1.year, 1982)

    def test_delete_car(self):
        delete_url = reverse('cars', kwargs={'pk': self.car1.pk})
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Cars.objects.count(), 1)