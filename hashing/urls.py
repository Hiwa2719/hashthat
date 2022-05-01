from django.urls import path, include
from . import views


app_name = 'hashing'


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('hash_list/', views.hash_list, name='hash-list'),
    path('save-text-hash/', views.save_hash, name='save-hash'),
    path('generate_hash/', views.generate_hash, name='generate-hash'),
    path('check_authentication/', views.check_authentication, name='check_authentication')
]
