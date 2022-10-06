from django.urls import re_path as url
from . import views


# animations url config
urlpatterns = [
    # 애니 전체 목록
    url(r"^server/v1/recomm/test", views.animation_list),
    
    # latent
    url(r"^server/v1/recomm/latent", views.lat_recomm),
    # surprise
    url(r"^server/v1/recomm/surprise", views.sur_recomm),
    #  hybrid
    url(r"^server/v1/recomm", views.recommend),    
]
