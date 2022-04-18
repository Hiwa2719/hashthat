import hashlib

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic import TemplateView, View, CreateView, DeleteView, ListView

from .models import Hash

User = get_user_model()


class IndexView(TemplateView):
    template_name = 'index.html'


def hash_generator(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


class HashGenerator(View):
    def post(self, request, *args, **kwargs):
        """Generating hash from text"""
        text = request.POST.get('text')
        return JsonResponse({'hash': hash_generator(text)})


class AccountView(LoginRequiredMixin, TemplateView):
    template_name = 'account.html'


class RegisterView(CreateView):
    form_class = UserCreationForm


class DeleteAccount(LoginRequiredMixin, DeleteView):
    success_url = reverse_lazy('hashing:index')
    model = User


class HashListView(LoginRequiredMixin, ListView):
    def get_queryset(self):
        return Hash.objects.filter(user=self.request.user)

