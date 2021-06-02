from django.urls import path
from .views import *

urlpatterns = [
    path('login/', loginPage, name='login'),
    path('join/', registerPage, name='signup'),
    path('logout/', logoutView, name='logout')
]
