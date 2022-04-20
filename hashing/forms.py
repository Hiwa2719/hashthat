from django import forms
from .models import Hash


class HashForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea,)
    text.widget.attrs.update({'class': 'form-control'})
