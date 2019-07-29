from django.shortcuts import render

# Create your views here.
from website.models import TV


def home(request):
    tvs=TV.objects.all()

    return render(request, "home.html", {"value": 4, "tvs": tvs})