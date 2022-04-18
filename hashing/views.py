import hashlib

from django.http import JsonResponse
from django.views.generic import TemplateView, View


class IndexView(TemplateView):
    template_name = 'index.html'


def hash_generator(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


class HashGenerator(View):
    def get(self, *args, **kwargs):
        """Generating hash from text"""
        text = self.kwargs.get('text')
        return JsonResponse({'hash': hash_generator(text)})
