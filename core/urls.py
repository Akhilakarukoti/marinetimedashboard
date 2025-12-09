"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    html = """
    <html>
      <head><title>Maritime Auth</title></head>
      <body style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
        <h1>Maritime Auth — Backend</h1>
        <p>Backend is running. Useful links:</p>
        <ul>
          <li><a href="/admin/">Django admin</a> (create users / profiles)</li>
          <li><a href="/api/auth/register/">Register endpoint (POST)</a></li>
          <li><a href="/api/auth/token/">Token (login) endpoint (POST)</a></li>
          <li><a href="/api/auth/profile/">Profile (GET, requires Authorization)</a></li>
        </ul>
        <p>Open <strong>/admin/</strong> to create test users or use an API client (Postman / curl) to POST to the register/token endpoints.</p>
      </body>
    </html>
    """
    return HttpResponse(html)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authapp.urls')),
]
