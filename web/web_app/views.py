from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

def home_view(request):
    if request.user.is_authenticated:
        return render(request, "index.html",{user_status: "Logged In"})
    else:
        return redirect("signup")

def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        #password1 = request.POST.get("password1")

        if User.objects.filter(username=username).exists():
            return render(request, "sign_up.html", {"error": "Username already exists"})
        
        # if password != password1:
        #     return render(request, "sign_up.html", {"error": "Passwords do not match"})

        user = User.objects.create_user(username=username,email=email,password=password)

        login(request, user)
        return redirect("home")

    return render(request, "sign_up.html")

def signin_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            return render(request, "sign_in.html", {"error": "Invalid credentials"})
    return render(request, "sign_in.html")