from django.urls import path, include
from . import views


app_name = 'hashing'


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
]
