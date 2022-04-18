from django.urls import path, include
from . import views


app_name = 'hashing'


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('hash-gen/', views.HashGenerator.as_view(), name='hash-gen'),
    path('account/', views.AccountView.as_view(), name='account'),

]
