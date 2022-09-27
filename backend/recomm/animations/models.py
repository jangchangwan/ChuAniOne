from djongo import models


# 애니 정보
class Animation(models.Model):
    # 애니 번호
    id = models.IntegerField(primary_key=True, blank=False, unique=True)
    # 시리즈 번호
    series_id = models.CharField(max_length=10)
    # 애니 이름
    name = models.CharField(max_length=255, blank=False)
    # 애니 줄거리
    content = models.CharField(max_length=500)
    # 방영 등급
    content_rating = models.CharField(max_length=20)
    # 장르
    genres = models.JSONField()
    # 태그
    tags = models.JSONField()
    # 애니 영상
    highlight_video = models.JSONField()
    # 애니 표지
    images = models.JSONField()
    # 평균 별점
    avg_rating = models.FloatField(default=0)
    # 방영 분기
    air_year_quarter = models.CharField(max_length=50)
    # 방영 요일
    distributed_air_time = models.JSONField()
    # 작가
    author = models.JSONField()
    # 제작사
    production = models.CharField(max_length=20)
    # 성인 인증 필요 여부
    is_adult = models.BooleanField()
    # 완결 여부
    is_ending = models.BooleanField()

    class Meta:
        db_table = "ani_info"
