from django.http.response import JsonResponse

from rest_framework import status

from .models import Animation
from .serializers import AnimationSerializer


# Create your views here.
def animation_list(request):
    animations = Animation.objects.all()
    ani_serializer = AnimationSerializer(animations, many=True)
    return JsonResponse(ani_serializer.data, status=status.HTTP_200_OK, safe=False)
