from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('sun_glasses/', views.sun_glasses, name='sun_glasses'),
    path('registration/', views.registration, name='registration'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.user_login, name='login'),
]