from django.shortcuts import render, redirect
from .forms import MessageForm, loginForm
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
from django.contrib.auth import authenticate, login


# Create your views here.
# def index(request):
#     return render(request, 'myapp/index.html')

def index(request):
    submitted = False
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = MessageForm()
        if 'submitted' in request.GET:
            submitted = True
    
    return render(request, 'myapp/index.html', {'form': form})

def index(request):
    user_form = UserCreationForm()
    return render(request, 'myapp/index.html', {'user_form': user_form})

def sun_glasses(request):
    return render(request, 'myapp/sunGlasses.html')

def registration(request):
    if request.method == 'POST':
        user_form=UserCreationForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            return HttpResponse('<h1>User created successfully </h1>')
    else:
        user_form=UserCreationForm()
    return render(request, 'myapp/registration.html', {'user_form': user_form})



def contact(request):
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')  # Redirect to the index page after successful form submission
    else:
        form = MessageForm()
    return render(request, 'myapp/index.html', {'form': form})  # Corrected template path


##### LOG IN #####

def user_login(request):
    if request.method == 'POST':
        form = loginForm(request.POST)
        if form.is_valid():
            cd=form.cleaned_data
            user=authenticate(request, username=cd['username'], password=cd['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse('Authenticated successfully')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid login')
    else:
        form=loginForm()
    return render(request, 'myapp/login.html', {'form': form})