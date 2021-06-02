from django.urls import path
from .views import *

urlpatterns = [
    path('', view=feed, name='feed'),
    path('profile/<int:id>/', view=profilePage, name="profile"),
    path('like-post/<str:cat>/<int:id>/', view=likePost, name='likePost'),
    path('create-post/<str:type>/', view=createPost, name='createPost'),
]
