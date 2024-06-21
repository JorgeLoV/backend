from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Drivers
from .serializers import DriversSerializer

class DriversAPITest(APITestCase):
    def setUp(self):
        self.driver1 = Drivers.objects.create(driver='Michele Mouton', co_driver='Fabrizia Pons')
        self.driver2 = Drivers.objects.create(driver='Markku Alén', co_driver='Ilkka Kivimäki')
        self.url = reverse('drivers')

    def test_get_drivers(self):
        response = self.client.get(self.url)
        drivers = Drivers.objects.all()
        serializer = DriversSerializer(drivers, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.asserEqual(response.data, serializer.data)

    def test_create_driver(self):
        data = {
            'driver': 'Walter Röhrl',
            'co_driver': 'Christian Geistdörfer'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Drivers.objects.count(), 3)
        self.assertEqual(Drivers.objects.get(id=response.data['id']).driver, 'Walter')

    def test_update_car(self):
        update_url = reserve('drivers', kwargs={'pk': self.driver1.pk})
        data = {
            'driver': 'Michele Mouton',
            'co_driver': 'Fabrizia Pons'
        }
        response = self.client.put(update_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.driver1.refresh_from_db()
        self.assertEqual(self.driver1.year, 1982)

    def test_delete_car(self):
        delete_url = reverse('drivers', kwargs={'pk': self.driver1.pk})
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Drivers.objects.count(), 1)