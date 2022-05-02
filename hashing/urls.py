from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'hashing'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('hash_list/', views.hash_list, name='hash-list'),
    path('save-text-hash/', views.save_hash, name='save-hash'),
    path('generate_hash/', views.generate_hash, name='generate-hash'),
    path('check_authentication/', views.check_authentication, name='check_authentication')
]
