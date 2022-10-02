from symbol import parameters
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, parser_classes
from rest_framework import status

from .models import Animation
from .serializers import AnimationSerializer, ReviewSerializer
from .hybrid import get_user_data
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@api_view(["GET"])
def animation_list(request):
    animations = Animation.objects.all()
    ani_serializer = AnimationSerializer(animations, many=True)
    return JsonResponse(ani_serializer.data, status=status.HTTP_200_OK, safe=False)


@swagger_auto_schema(methods=['post'], request_body=ReviewSerializer, operation_description="Create a post object")
@api_view(["POST"])
@parser_classes([JSONParser])
def recommend(request):
    data = request.data
    member_id = data["member_id"]
    ani_id = data["ani_id"]
    score = data["score"]
    # os.system("python animations/hybrid.py")
    response = {"recomm": get_user_data(user_id=member_id, ani_id=ani_id, score=score)}
    print(member_id, ani_id, score)
    return JsonResponse(response, status=status.HTTP_200_OK, safe=False)
