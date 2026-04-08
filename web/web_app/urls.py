from django.urls import path
from .views import home_view, signin_view, signup_view

urlpatterns = [
    path('', home_view, name='home'),
    path('signup/', signup_view, name='signup'),
    path('signin/', signin_view, name='signin'),
    ]
