from django.contrib.auth.hashers import make_password
import hashlib
import json

from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

from .models import Hash

User = get_user_model()


def hash_generator(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


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
                'created_date': hash.date_format()
            } for hash in hashes
        ]
        return JsonResponse(hash_list, safe=False)
    return JsonResponse({'errror': 'You don\'t have access to this page'}, status=400)


def delete_account(request):
    user = request.user
    if user.is_authenticated:
        user.delete()
        return JsonResponse({})
    return JsonResponse({'error': 'You are not allowed to do this request'})


@csrf_exempt
def change_password(request):
    user = request.user
    if user.is_authenticated and request.method == 'POST':
        data = json.loads(request.body)
        form = PasswordChangeForm(user=user, data=data)
        if form.is_valid():
            form.save()
            return JsonResponse({})
        return JsonResponse(form.errors, status=400)
    return JsonResponse({'error': 'You are not allowed to do this action'}, status=400)
