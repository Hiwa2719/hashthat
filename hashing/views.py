import hashlib

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic import TemplateView, View, CreateView, DeleteView, ListView, FormView

from .forms import HashForm
from .models import Hash

User = get_user_model()


def hash_generator(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


class IndexView(FormView):
    template_name = 'hashing/index.html'
    form_class = HashForm

    def form_valid(self, form):
        context = super().get_context_data()
        context.update({
            'form': form,
            'hash': hash_generator(self.request.POST.get('text'))
        })
        return self.render_to_response(context)


class AccountView(LoginRequiredMixin, TemplateView):
    template_name = 'hashing/account.html'


class RegisterView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/login.html'
    success_url = reverse_lazy('hashing:index')


class DeleteAccount(LoginRequiredMixin, DeleteView):
    success_url = reverse_lazy('hashing:index')
    model = User


class HashListView(LoginRequiredMixin, ListView):
    def get_queryset(self):
        return Hash.objects.filter(user=self.request.user)


class SaveHash(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        text = request.POST.get('text')
        hash_string = hash_generator(text)
        Hash.objects.create(user=request.user, text=text, hash=hash_string)
        return JsonResponse({'message': 'your text and hash has been saved'})
