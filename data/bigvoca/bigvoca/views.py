from rest_framework import status
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from django.core.paginator import Paginator
from bigvoca.models import Words
from bigvoca.serializers import WordSerializer


# Create your views here.
def get_list(request):
    # 1000개의 데이터만 불러옴
    voca = Words.objects.all()[:1000]
    serializer = WordSerializer(voca, many=True)

    # 페이지네이션 (한 페이지에 8개의 데이터)
    paginator = Paginator(serializer.data, 8)
    page = request.GET.get("page")
    words = paginator.get_page(page)

    response = words

    return JsonResponse(list(response), safe=False, json_dumps_params={'ensure_ascii': False}, status=200)
