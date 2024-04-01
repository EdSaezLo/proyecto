from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, 'homepage/home.html')

def login(request):
    return render(request,'homepage/login.html')

def about(request):
    return render(request, 'homepage/about.html')