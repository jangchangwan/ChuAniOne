import djongo.models as mongo


# 애니 정보
class Animation(mongo.Model):
    # 애니 번호
    id = mongo.IntegerField(primary_key=True, blank=False, unique=True)
    # 시리즈 번호
    series_id = mongo.CharField(max_length=10)
    # 애니 이름
    name = mongo.CharField(max_length=255, blank=False)
    # 애니 줄거리
    content = mongo.CharField(max_length=500)
    # 방영 등급
    content_rating = mongo.CharField(max_length=20)
    # 장르
    genres = mongo.JSONField()
    # 태그
    tags = mongo.JSONField()
    # 애니 영상
    highlight_video = mongo.JSONField()
    # 애니 표지
    images = mongo.JSONField()
    # 평균 별점
    avg_rating = mongo.FloatField(default=0)
    # 방영 분기
    air_year_quarter = mongo.CharField(max_length=50)
    # 방영 요일
    distributed_air_time = mongo.JSONField()
    # 작가
    author = mongo.JSONField()
    # 제작사
    production = mongo.CharField(max_length=20)
    # 성인 인증 필요 여부
    is_adult = mongo.BooleanField()
    # 완결 여부
    is_ending = mongo.BooleanField()

    class Meta:
        db_table = "ani_info"


# 리뷰
class Review(mongo.Model):
    # 리뷰 번호
    id = mongo.IntegerField(primary_key=True, blank=False, unique=True)
    # 작성 유저
    profile = mongo.IntegerField()
    # 평점
    score = mongo.FloatField()
    # 내용
    content = mongo.CharField(max_length=1000)
    # 애니메이션 번호
    animation = mongo.IntegerField(default=0)

    class Meta:
        db_table = "ani_review"


# 사용자 시청 기록
class History(mongo.Model):
    # 유저 번호
    member_id = mongo.IntegerField(primary_key=True, blank=False, unique=True)
    # 평점 기반 추천된 애니메이션 리스트
    recommended = mongo.JSONField(default={})

    class Meta:
        db_table = "ani_log"


# 애니메이션 토픽
class Feature(mongo.Model):
    # 애니메이션 아이디
    id = mongo.IntegerField(primary_key=True, blank=False, unique=True)
    # 토픽 리스트
    feature = mongo.JSONField()
    # 토픽 문자열
    feat_str = mongo.CharField(max_length=1000)
    # 시리즈 번호
    series_id = mongo.CharField(max_length=10)
    # 관련 있는 애니 리스트
    related = mongo.JSONField()

    class Meta:
        db_table = "ani_feature"
