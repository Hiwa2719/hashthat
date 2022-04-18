import hashlib

from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.generic import TemplateView, View, CreateView, DeleteView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy

User = get_user_model()


class IndexView(TemplateView):
    template_name = 'index.html'


def hash_generator(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


class HashGenerator(View):
    def post(self,request, *args, **kwargs):
        """Generating hash from text"""
        text = request.POST.get('text')
        return JsonResponse({'hash': hash_generator(text)})


class AccountView(TemplateView):
    template_name = 'account.html'


class RegisterView(CreateView):
    form_class = UserCreationForm


class DeleteAccount(DeleteView):
    success_url = reverse_lazy('hashing:index')
    model = User
