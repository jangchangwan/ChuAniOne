from django.urls import re_path as url
from bigvoca import views as voca_view

urlpatterns = [
    url(r"^v1/voca$", voca_view.get_list), # Voca 전체 리스트
    # url(r"^v1/voca/(?P<pk>\d+)/$", voca_view.MyVoca.as_view()),
]