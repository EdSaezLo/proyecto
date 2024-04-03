from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages
from .forms import CustomUserCreationForm



def home(request):
    return render(request, 'homepage/home.html')

def about(request):
    return render(request, 'homepage/about.html')

def login(request):
    return render(request, 'registration/login.html')


@login_required

def nombre(request):
    return render(request,'homepage/nombre.html')

def exit(request):
    logout(request)
    return redirect('home')

def register(request):
    data = {
        "form": CustomUserCreationForm()
        
    }
    
    if request.method  == 'POST':
        user_creation_form =CustomUserCreationForm(data = request.POST)
        if user_creation_form.is_valid():
            user_creation_form.save()
            user = authenticate(username=user_creation_form.cleaned_data['username'], password=user_creation_form.cleaned_data['password1'])
            auth_login(request,user)
            return redirect('home')
    return render(request, 'registration/register.html', data)

