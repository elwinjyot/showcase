from django.db.models.fields import DateField
from django.http.response import JsonResponse
from django.shortcuts import render
from django.utils import tree
from .models import *
from itertools import chain
from django.contrib.auth.decorators import login_required
# Create your views here.


@login_required(login_url="/auth/login/")
def feed(request):
    user = request.user
    showcaser = user.showcaser
    following = list(showcaser.following.all())
    blogs = Blog.objects.filter(owner__in=following)
    products = Product.objects.filter(owner__in=following)
    all_posts = sorted(chain(blogs, products),
                       key=lambda instance: instance.posted_on)
    print(all_posts)
    variables = {
        "all_posts": all_posts,
        "all_following": following
    }
    return render(request=request, template_name='feed.html', context=variables)


@login_required(login_url="/auth/login/")
def likePost(request, cat, id):
    if request.is_ajax and request.method == 'POST':
        cat = cat.lower()
        if cat == 'blog':
            post = Blog.objects.get(id=id)
            likedUsers = post.likes.all()
            if request.user not in likedUsers:
                post.likes.add(request.user)
                post.save()
                return JsonResponse({"status": True, "body": {"likes": len(post.likes.all()), "liked": True}})
            else:
                post.likes.remove(request.user)
                post.save()
                return JsonResponse({"status": True, "body": {"likes": len(post.likes.all()), "liked": False}})

        elif cat == 'product':
            post = Product.objects.get(id=id)
            likedUsers = post.likes.all()
            if request.user not in likedUsers:
                post.likes.add(request.user)
                post.save()
                return JsonResponse({"status": True, "body": {"likes": len(post.likes.all()), "liked": True}})
            else:
                post.likes.remove(request.user)
                post.save()
                return JsonResponse({"status": True, "body": {"likes": len(post.likes.all()), "liked": False}})


def profilePage(request, id):
    user = User.objects.get(id=id)
    userToBeFollowed = user
    userFollowing = request.user
    posts = sorted(chain(Blog.objects.filter(owner=user), Product.objects.filter(
        owner=user)), key=lambda instance: instance.posted_on)
    followers = user.showcaser.followers.all()
    if request.is_ajax and request.method == "POST" and request.headers.get("action") == "follow":
        userFollowing.showcaser.following.add(userToBeFollowed)
        userToBeFollowed.showcaser.followers.add(userFollowing)
        userFollowing.save()
        userToBeFollowed.save()
        return JsonResponse({"status": True, "error": None, "body": {"followers": len(userToBeFollowed.showcaser.followers.all())}}, safe=True)
    elif request.is_ajax and request.method == "POST" and request.headers.get("action") == "unfollow":
        userFollowing.showcaser.following.remove(userToBeFollowed)
        userToBeFollowed.showcaser.followers.remove(userFollowing)
        userFollowing.save()
        userToBeFollowed.save()
        return JsonResponse({"status": True, "error": None, "body": {"followers": len(userToBeFollowed.showcaser.followers.all())}}, safe=True)
    context = {
        "user": user,
        "followers": followers,
        "posts": posts
    }
    return render(request=request, template_name="profile.html", context=context)


def createPost(request, type):
    variables = {
        "form": type
    }
    return render(request=request, template_name="create-post.html", context=variables)
