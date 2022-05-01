import hashlib
import json

from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, DeleteView, ListView, FormView

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


@csrf_exempt
def save_hash(request):
    if request.method == 'POST' and request.user.is_authenticated:
        text = json.loads(request.body).get('text')
        hash_string = hash_generator(text)
        try:
            Hash.objects.create(user=request.user, text=text, hash=hash_string)
        except IntegrityError:
            pass
        return JsonResponse({'message': 'your text and hash has been saved'})
    return JsonResponse({'error': 'Wrong http method'}, status=403)


def generate_hash(request):
    text = request.GET.get('text')
    return JsonResponse({'hash': hash_generator(text)})


@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    form = AuthenticationForm(request, data=data)
    if form.is_valid():
        login(request, form.get_user())
        return JsonResponse({'isAuthenticate': True})
    return JsonResponse(form.errors, status=400)


def check_authentication(request):
    return JsonResponse({'isAuthenticated': request.user.is_authenticated})


def logout_view(request):
    logout(request)
    return JsonResponse({'isAuthenticated': False})


def hash_list(request):
    user = request.user
    if user.is_authenticated:
        hashes = Hash.objects.filter(user=user).order_by('-created_date')
        hash_list = [
            {
                'text': hash.text,
                'hash': hash.hash,
                'created_date': hash.created_date
            } for hash in hashes
        ]
        return JsonResponse(hash_list, safe=False)
    return JsonResponse({'errror': 'You don\'t have access to this page'}, status=400)
