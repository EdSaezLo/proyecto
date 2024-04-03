from django.contrib import admin
from django.urls import path, include
from .views import home
from .views import nombre
from .views import about
from .views import login, exit, register

urlpatterns = [
    path('', home, name = 'home'),
    path('nombre/', nombre, name  = 'nombre'),
    path('about/', about, name='about'),
    path('login/', login, name='login'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    path('logout/', exit, name='exit'),
    path('register/', register, name = 'register')
]