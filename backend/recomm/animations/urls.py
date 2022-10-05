from django.urls import re_path as url
from . import views


# animations url config
urlpatterns = [
    # 애니 전체 목록
    url(r"^server/v1/recomm/test", views.animation_list),
    # 리뷰 기반 추천
    url(r"^server/v1/recomm", views.recommend),
    
]
