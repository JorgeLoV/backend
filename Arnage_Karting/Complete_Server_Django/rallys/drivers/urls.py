from django.urls import path
from .views import DriverListCreate
from drivers.viewsets import DriversViewSet

urlpatterns = [
    path('drivers/', DriverListCreate.as_view(), name = 'driver_list_create'),
    path('viewset/', include('drivers.urls'))
]