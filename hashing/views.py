from django.views.generic import FormView, TemplateView


class IndexView(TemplateView):
    template_name = 'index.html'


