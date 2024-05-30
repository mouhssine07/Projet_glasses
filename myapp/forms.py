from django import forms
from .models import Message
from django.core.exceptions import ValidationError
from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['name', 'email', 'message']
        labels = {'name': 'Your Name', 'email': 'Your Email', 'message': 'Your Message'}    
        

class loginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)