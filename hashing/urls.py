from django.urls import path, include
from . import views


app_name = 'hashing'


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('hash-gen/', views.HashGenerator.as_view(), name='hash-gen'),
    path('hash-list/', views.HashListView.as_view(), name='hash-list'),
    path('save-text-hash/', views.SaveHash.as_view(), name='save-hash'),
]
