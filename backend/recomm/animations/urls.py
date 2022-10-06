from django.urls import re_path as url
from . import views


# animations url config
urlpatterns = [
    # 애니 전체 목록
    url(r"^server/v1/recomm/test", views.animation_list),
    # 평점 기반 추천 - not hybrid
    # url(r"^server/v1/recomm/surprise", views.sur_recomm),
    url(r"^server/v1/recomm", views.sur_recomm),
    # 평점 기반 추천 - hybrid
    # url(r"^server/v1/recomm", views.recommend),
    
]
