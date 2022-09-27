from django.urls import re_path as url
from . import views


# animations url config
urlpatterns = [
    # 애니 전체 목록(필터, 검색)
    url(r"^api/v1/animations", views.animation_list),
]