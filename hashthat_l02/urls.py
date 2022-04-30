"""hashthat_l02 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView, PasswordChangeView
from django.urls import path, include

from hashing import views

urlpatterns = [
    path('account/', views.AccountView.as_view(), name='account'),
    path('admin/', admin.site.urls),
    path('change-password/', PasswordChangeView.as_view(), name='change-password'),
    path('delete-account/<int:pk>/', views.DeleteAccount.as_view(), name='delete-account'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('', include('hashing.urls'))
]
