import hashlib
import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
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


@csrf_exempt
def register_view(request):
    data = json.loads(request.body)
    form = UserCreationForm(data=data)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return JsonResponse({})
    return JsonResponse(form.errors, status=400)


class DeleteAccount(LoginRequiredMixin, DeleteView):
    success_url = reverse_lazy('hashing:index')
    model = User


class HashListView(LoginRequiredMixin, ListView):
    def get_queryset(self):
        return Hash.objects.filter(user=self.request.user)


class SaveHash(LoginRequiredMixin, View):
    def dispatch(self, request, *args, **kwargs):
        print('in dispatch')
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        text = request.POST.get('text')
        print(text)
        raise
        hash_string = hash_generator(text)
        Hash.objects.create(user=request.user, text=text, hash=hash_string)
        return JsonResponse({'message': 'your text and hash has been saved'})


def generate_hash(request):
    text = request.GET.get('text')
    return JsonResponse({'hash': hash_generator(text)})


@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return JsonResponse({'isAuthenticate': True})
    return JsonResponse({}, status=400)


def check_authentication(request):
    return JsonResponse({'isAuthenticated': request.user.is_authenticated})


def logout_view(request):
    logout(request)
    return JsonResponse({'isAuthenticated': False})
