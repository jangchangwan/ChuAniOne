from django.urls import re_path as url
from . import views


# animations url config
urlpatterns = [
    # 리뷰 기반 추천
    url(r"^api/v1/recomm", views.recommend),
    # 애니 전체 목록
    url(r"^api/v1/recomm/test", views.animation_list),
]
