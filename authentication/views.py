from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
# Create your views here.


def loginPage(request):
    if request.is_ajax and request.method == "POST":
        credentials = {
            "username": request.POST.get("username"),
            "password": request.POST.get("password")
        }
        user = authenticate(
            request=request, username=credentials["username"], password=credentials["password"])
        if user is not None:
            login(request=request, user=user)
            return JsonResponse(200, safe=False)
        else:
            return JsonResponse(401, safe=False)
    return render(request, 'auth/login.html', context=None)


def registerPage(request):
    if request.is_ajax and request.method == "POST" and request.headers.get("action") == "create-user":
        credentials = {
            "name": request.POST.get("name"),
            "email": request.POST.get("email"),
            "username": request.POST.get("username"),
            "password": request.POST.get("password"),
        }
        User.objects.create_user(first_name=credentials["name"],
                                 email=credentials["email"],
                                 username=credentials["username"],
                                 password=credentials["password"])
        user = authenticate(
            request=request, username=credentials["username"], password=credentials["password"])
        if user is not None:
            login(request=request, user=user)
        return JsonResponse({"status": True, "error": None}, safe=True)
    elif request.is_ajax and request.method == "GET" and request.headers.get("action") == "check-username":
        username = request.GET.get("username")
        if User.objects.filter(username=username).exists():
            return JsonResponse({"status": False, "error": "Username taken!"}, safe=True)
        else:
            return JsonResponse({"status": True, "error": None}, safe=True)

    return render(request=request, template_name="auth/signup.html", context=None)


def logoutView(request):
    logout(request=request)
    return redirect('feed')
