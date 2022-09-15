# 📌 Laftel API

| 번호 | 내용                                            | 상세                                                                                                              |
| ---- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1️⃣   | [검색 필터 정보](#✏️-검색-필터-정보)            |                                                                                                                   |
| 2️⃣   | [애니메이션 검색](#✏️-애니메이션-검색)          |                                                                                                                   |
| 3️⃣   | [요일별 신작](#✏️-요일별-신작)                  |                                                                                                                   |
| 4️⃣   | [애니메이션 조회](#✏️-애니메이션-조회)          | [애니메이션 상세 정보](#애니메이션-상세-정보)<br/>[시리즈 조회](#시리즈-조회)<br/>[에피소드 조회](#에피소드-조회) |
| 5️⃣   | [애니메이션별 리뷰](#✏️-애니메이션별-리뷰-목록) | [리뷰 수](#애니메이션별-리뷰-수)<br/>[평점 상세](#애니메이션-평점-상세)<br/>[리뷰 목록](#애니메이션-리뷰-목록)    |

<br/><hr/><br/>

## ✔️ 헤더 설정

- request header에 `"laftel": "TeJava"` 포함해서 전달

<br/>

### ✏️ 검색 필터 정보

> `GET` https://laftel.net/api/v1.0/info/discover/

```json
{
  "brands": ["애니맥스 플러스", "애니플러스", "kt alpha", "대원", "기타"],
  "genres": [
    "BL",
    "GL 백합",
    "SF",
    "개그",
    "공포",
    "드라마",
    "로맨스",
    "모험",
    "무협",
    "미스터리",
    "범죄",
    "성인",
    "스릴러",
    "스포츠",
    "시대물",
    "아동",
    "아이돌",
    "액션",
    "음식",
    "음악",
    "이세계",
    "일상",
    "재난",
    "추리",
    "치유",
    "특촬",
    "판타지",
    "하렘"
  ],
  "tags": [
    "가족",
    "감동",
    "게임",
    "동물",
    "동양풍",
    "두뇌싸움",
    "로봇",
    "루프물",
    "마법소녀",
    "먼치킨",
    "무거움",
    "배틀",
    "뱀파이어",
    "복수",
    "삼각관계",
    "서양풍",
    "선생님",
    "성장",
    "슬픔",
    "시간여행",
    "역하렘",
    "연예인",
    "열혈",
    "오타쿠",
    "요괴 및 괴물",
    "육아",
    "정치",
    "좀비",
    "주체적 여성",
    "짝사랑",
    "철학",
    "퇴마",
    "학교"
  ],
  "years": {
    "animation": [
      "2022년 4분기",
      "2022년 3분기",
      "2022년 2분기",
      "2022년 1분기",
      "2021년 4분기",
      "2021년 3분기",
      "2021년 2분기",
      "2021년 1분기",
      "2020년",
      "2019년",
      "2018년",
      "2017년",
      "2016년",
      "2015년",
      "2014년",
      "2013년",
      "2012년",
      "2011년",
      "2010년",
      "2000년대",
      "2000년대 이전"
    ]
  },
  "productions": [
    "본즈",
    "쿄토애니메이션",
    "매드하우스",
    "A-1Pictures",
    "유포테이블",
    "WitStudio",
    "프로덕션 I.G",
    "P.A.Works",
    "J.C.Staff",
    "샤프트",
    "동화공방",
    "스튜디오 딘",
    "실버 링크",
    "스튜디오 피에로",
    "MAPPA",
    "화이트폭스",
    "라르케",
    "트리거",
    "폴리곤 픽쳐스",
    "사테라이트"
  ]
}
```

<br/><br/>

### ✏️ 애니메이션 검색

> `GET` https://laftel.net/api/search/v1/discover/  
> | Query String | value | 내용 |
> | --- | --- | --- |
> | sort | rank | 랭킹 순 |
> | | name | 이름 순 |
> | | recent | 최신 순 |
> | | cnt_eval | 평가 많은 순 |
> | | avg_rating | 평가 높은 순 |
> | brands | [브랜드명] | 해당 브랜드 작품 |
> | genres | [장르명] | 해당 장르 작품 |
> | tags | [태그명] | 해당 태그가 포함된 작품 |
> | years | [분기명] | 해당 푼기의 작품 |
> | ending | true/false | 방영중인 작품/X |
> | viewable | true | 판권 만료 X |
> | size | int | 한 페이지에 보여줄 작품 수 |
> | offset | int | 두 번째 주소를 만들기 위해 기준이 되는 주소에 더해진 값 |

```json
{
  "count": 6931,
  "results": [
    {
      "id": 39986,
      "name": "주술회전 part 1",
      "img": "https://image.laftel.net/items/thumbs/big/e77734bd-d57b-4a25-b086-2e49d602e5ce.jpg",
      "cropped_img": "0,154,240,289",
      "home_img": "items/full/e77734bd-d57b-4a25-b086-2e49d602e5ce.jpg",
      "home_cropped_img": "0,400,624,751",
      "images": [
        {
          "crop_ratio": "0,400,624,751",
          "img_url": "https://thumbnail.laftel.net/items/full/e77734bd-d57b-4a25-b086-2e49d602e5ce.jpg",
          "option_name": "home_default"
        },
        {
          "crop_ratio": "4,0,834,467",
          "img_url": "https://thumbnail.laftel.net/items/home/e37723a4-16e6-424d-9019-f675776439d7.jpg",
          "option_name": "home_custom"
        }
      ],
      "is_adult": false,
      "genres": ["판타지", "액션"],
      "medium": "TVA",
      "distributed_air_time": "일요일",
      "is_laftel_only": false,
      "is_uncensored": false,
      "is_dubbed": false,
      "is_avod": true,
      "is_viewing": true,
      "latest_episode_created": "2020-12-27T01:00:00.122537",
      "is_episode_existed": true,
      "is_expired": false,
      "latest_published_datetime": "2020-12-27T01:00:00.122537"
    },
    {
      "id": 39431,
      "name": "(무삭제) 귀멸의 칼날",
      "img": "https://image.laftel.net/items/thumbs/big/9ec007f6-bc13-4c9d-88e0-3783e5507ecd.jpg",
      "cropped_img": "0,85,216,207",
      "home_img": "items/full/9ec007f6-bc13-4c9d-88e0-3783e5507ecd.jpg",
      "home_cropped_img": "0,188,480,459",
      "images": [
        {
          "crop_ratio": "0,188,480,459",
          "img_url": "https://thumbnail.laftel.net/items/full/9ec007f6-bc13-4c9d-88e0-3783e5507ecd.jpg",
          "option_name": "home_default"
        },
        {
          "crop_ratio": "0,0,940,529",
          "img_url": "https://thumbnail.laftel.net/items/home/5047bade-341f-43f8-b9d3-722280054cee.jpg",
          "option_name": "home_custom"
        }
      ],
      "is_adult": true,
      "genres": ["판타지", "액션", "시대물"],
      "medium": "TVA",
      "distributed_air_time": "[]",
      "is_laftel_only": false,
      "is_uncensored": true,
      "is_dubbed": false,
      "is_avod": true,
      "is_viewing": true,
      "latest_episode_created": "2019-10-02T10:00:00.176767",
      "is_episode_existed": true,
      "is_expired": false,
      "latest_published_datetime": "2019-10-02T10:00:00.176767"
    },
    {
      "id": 16075,
      "name": "은혼 1기",
      "img": "https://image.laftel.net/items/thumbs/big/13ab0a22-8b65-4b50-ad2a-502a308d3de5.jpg",
      "cropped_img": "0,0,239,135",
      "home_img": "items/full/d4a0d6ff-19ab-4d50-b5bc-c0fe0b0a9ee9.jpg",
      "home_cropped_img": "0,19,800,469",
      "images": [
        {
          "crop_ratio": "0,19,800,469",
          "img_url": "https://thumbnail.laftel.net/items/full/d4a0d6ff-19ab-4d50-b5bc-c0fe0b0a9ee9.jpg",
          "option_name": "home_default"
        },
        {
          "crop_ratio": "0,60,640,420",
          "img_url": "https://thumbnail.laftel.net/items/home/4ea9e512-f9f3-4b35-a4b2-107a3c47fcd0.jpg",
          "option_name": "home_custom"
        }
      ],
      "is_adult": true,
      "genres": ["판타지", "액션", "개그", "성인", "시대물", "무협"],
      "medium": "TVA",
      "distributed_air_time": "화요일",
      "is_laftel_only": false,
      "is_uncensored": false,
      "is_dubbed": false,
      "is_avod": false,
      "is_viewing": true,
      "latest_episode_created": "2022-05-17T00:00:00.102805",
      "is_episode_existed": true,
      "is_expired": false,
      "latest_published_datetime": "2022-05-17T00:00:00.102805"
    }
  ]
}
```

<br/>

### ✏️ 요일별 신작

: 일주일 방영 목록

> `GET` https://laftel.net/api/search/v2/daily/

```json
[
  {
    "id": 40902,
    "name": "오버로드 4기",
    "img": "https://thumbnail.laftel.net/items/full/7e65b1b2-50f4-4f94-869a-fd9c0003b879.jpg",
    "cropped_img": "0,499,1024,1075",
    "images": [
      {
        "crop_ratio": "0,499,1024,1075",
        "img_url": "https://thumbnail.laftel.net/items/full/7e65b1b2-50f4-4f94-869a-fd9c0003b879.jpg",
        "option_name": "home_default"
      }
    ],
    "is_adult": true,
    "genres": ["이세계", "판타지", "액션", "성인"],
    "medium": "TVA",
    "distributed_air_time": "수요일",
    "is_laftel_only": false,
    "is_uncensored": false,
    "is_dubbed": false,
    "is_avod": false,
    "is_viewing": true,
    "latest_episode_created": "2022-09-13T23:30:09.488169",
    "latest_published_datetime": "2022-09-13T23:30:09.488169",
    "is_episode_existed": true,
    "is_expired": false
  },
  {
    "id": 14188,
    "name": "갓슈벨!!",
    "img": "https://thumbnail.laftel.net/items/full/ed782413-1ecf-415e-bd69-1907bf762747.jpg",
    "cropped_img": "6,483,1024,1056",
    "images": [
      {
        "crop_ratio": "6,483,1024,1056",
        "img_url": "https://thumbnail.laftel.net/items/full/ed782413-1ecf-415e-bd69-1907bf762747.jpg",
        "option_name": "home_default"
      }
    ],
    "is_adult": false,
    "genres": ["이세계", "판타지", "액션", "개그"],
    "medium": "TVA",
    "distributed_air_time": "목요일",
    "is_laftel_only": false,
    "is_uncensored": false,
    "is_dubbed": false,
    "is_avod": false,
    "is_viewing": true,
    "latest_episode_created": "2022-09-08T00:00:08.864791",
    "latest_published_datetime": "2022-09-08T00:00:08.864791",
    "is_episode_existed": true,
    "is_expired": false
  }
]
```

<br/><br/>

### ✏️ 애니메이션 조회

#### 애니메이션 상세 정보

> `GET` https://laftel.net/api/items/v2/{애니메이션 번호}/

```json
{
  "id": 22114,
  "name": "은혼 2기 DASH편",
  "notice": "",
  "img": "https://image.laftel.net/items/thumbs/big/c9777e8e-582d-410a-8d6c-2450c32d0859.jpg?Expires=1663106149&Signature=i8o30hrrU23AUNGIF7JIQ~s3QdFWxklpkCMpLZyVJckQ0xr8dtopX5hePOXOuH3bVwT23OdEFDvMrVLA8kRcR41wzfpIHIpHgvsDrLokLnV-Z3gAEolgHfwrdqVIRsbXhjH4wC1Zh20CGkU1PylzQ7FaMqfXV~ybqcqDhc3Y8vrnUh~jgGlc~rVz6ZCGkW8cQY4vHvoqzWz6d5gW--MIEZoRazVkSqoheoeO7kO9AlqbZ-m-WzhsUJSXs~dT5IeTQqdE3~Y07Rhm8yq2rKqLVZbZsYtZu4XkhCqjN9VrY0J060JAI3En4zohvKN6DFQocxmIodHQYC5E-kIZGSoL3g__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
  "images": [
    {
      "option_name": "home_default",
      "img_url": "https://thumbnail.laftel.net/items/full/29d83db2-b4b4-4862-ab95-9b456b7bf529.jpg",
      "crop_ratio": "0,373,1024,949"
    }
  ],
  "highlight_video": null,
  "content": "에도 시대 말기, 하늘에서 내려온 ‘천인’의 침략으로 전쟁이 발생한다. 막부들은 결국 천인과의 공존을 위해 사람들에게 검을 소지할 수 없도록 폐도령을 내려서 사무라이가 큰 위기를 겪고 있다. 그러나 사무라이 정신을 굳게 간직한 남자가 있었으니 그의 이름은 사카타 긴토키. 단 것을 좋아하는 저돌적인 이 남자가 부패한 에도를 두동강을 낼지도?! 긴토키가 동료들을 만나면서 일어나는 병맛 코미디물.",
  "awards": ["라프텔 역대 애니 인기 랭킹 100위"],
  "medium": "TVA",
  "content_rating": "성인 이용가",
  "is_ending": false,
  "production": "선라이즈",
  "air_year_quarter": "2011년 2분기|2022년 3분기",
  "is_dubbed": false,
  "is_laftel_only": false,
  "is_uncensored": false,
  "distributed_air_time": "화요일",
  "is_adult": true,
  "has_free_episode": false,
  "is_avod": false,
  "is_svod": true,
  "is_viewing": true,
  "genres": ["판타지", "액션", "개그", "성인", "시대물", "무협"],
  "cnt_short_review": 336,
  "avg_rating": 4.4,
  "tags": ["동양풍", "외계인", "판타지", "액션", "개그", "성인", "시대물", "무협", "마을", "상점"],
  "expire_datetime": null,
  "is_episode_existed": true,
  "series_id": 3989,
  "author": ["소라치 히데아키"],
  "illustrator": ["소라치 히데아키"],
  "is_wish": false,
  "is_hate": false
}
```

<br/>

#### 시리즈 조회

> `GET` https://laftel.net/api/items/v2/series/{시리즈 번호}/?limit=20&offset=0

```json
{
  "count": 9,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 16075,
      "name": "은혼 1기"
    },
    {
      "id": 22114,
      "name": "은혼 2기 DASH편"
    },
    {
      "id": 20547,
      "name": "극장판 은혼 : 신역홍앵편"
    },
    {
      "id": 40772,
      "name": "극장판 은혼 완결편 : 해결사여 영원하라 - 판권 부활"
    },
    {
      "id": 24502,
      "name": "은혼 3기"
    },
    {
      "id": 37934,
      "name": "은혼 4기 포로리편"
    },
    {
      "id": 38253,
      "name": "은혼 4기 은빛 영혼편 1부"
    },
    {
      "id": 38854,
      "name": "은혼 4기 은빛 영혼편 2부"
    },
    {
      "id": 40406,
      "name": "은혼 더 파이널"
    }
  ]
}
```

<br/>

#### 에피소드 조회

> `GET` https://laftel.net/api/episodes/v2/list/?item_id=22114&sort=oldest&limit=20&show_playback_offset=true&offset=0
> | Query String | value | 내용 |
> | --- | --- | --- |
> | sort | oldest | 1화 부터 |
> | | newest | 최신화 |

```json
{
  "count": 59,
  "next": "https://laftel.net/api/episodes/v2/list/?item_id=22114&limit=20&offset=20&sort=oldest",
  "previous": null,
  "results": [
    {
      "id": 54677,
      "title": "은혼 2기 DASH편",
      "subject": "봄방학이 끝나면 다들 조금 어른처럼 보인다",
      "description": "애니 은혼의 1년간의 휴지기가 끝나고 새로이 재개되게 되어 오랜만에 해결사 사무소를 찾아간 신파치. 그런데 사무소 안에 웬 낯선 남자가 있는 것. 남의 사무실에서 뭐 하냐고 하자 돌아보는 남자. 그런데 그 남자는 자신이 긴토키라고 하는 것. 도대체 1년간 무슨 일이 있었길래 아예 딴사람처럼 변한 건지 의아해하는 신파치. 그런데 그때 웬 낯선 여자가 또 사무소로 들어오는데, 그 여자 역시 자신이 카쿠라라고 하는 것. 1년 사이 앳된 소녀 같은 모습은 온데간데없고, 키도 몸매도 완전히 숙녀가 돼서 돌아온 카쿠라. 뿐만 아니라 1년이 아니라 2년이 지났다는 것. 이들에겐 과연 무슨 일이...?",
      "episode_num": "1",
      "episode_order": 1,
      "thumbnail_path": "https://thumbnail.laftel.net/assets/2022/05/57821/v15/Thumbnail.0000057.jpg",
      "has_preview": true,
      "access_info_list": [],
      "running_time": "0:24:00.066000",
      "progressbar": null,
      "item_expire_datetime": null,
      "in_app_download": true,
      "is_avod": false,
      "is_free": false,
      "is_viewing": true,
      "products": [],
      "episode_products": [
        {
          "id": 73403,
          "name": "은혼 2기 DASH편 1 대여",
          "list_price": 700,
          "period": "7 day",
          "promotion": null
        },
        {
          "id": 73402,
          "name": "은혼 2기 DASH편 1 소장",
          "list_price": 1500,
          "period": "0 day",
          "promotion": null
        }
      ],
      "published_datetime": "2022-06-07T00:00:00.138778",
      "access_type": null,
      "is_available": false
    },
    {
      "id": 54678,
      "title": "은혼 2기 DASH편",
      "subject": "여름방학이 끝나도 모두 조금 어른처럼 보인다",
      "description": "자신을 제외한 주변의 모든 사람이 자신은 1년이라고 알고 있는 2년 사이에 엄청난 변화와 발전(?)을 이뤘는데 자신만 뒤처져 있다는 자괴감에 바닷가를 찾은 신파치. 그런데 그곳에서도 큐베와 카츠라마저도 조금 많이 황당하지만 변해 있는 모습을 보고는 아연실색을 한다. 심지어 진선조의 대원들조차도 생각지도 못한 모습으로 변해 있는 걸 보고 경악을 금치 못한다. 심지어 진선조 본부로 가 보니 진선조 자체도 양이지사와 마찬가지로 정권을 찬탈하려는 집단으로 바뀌어 있는 것. 그런데 히지카타가 의외의 말을 하는데...",
      "episode_num": "2",
      "episode_order": 2,
      "thumbnail_path": "https://thumbnail.laftel.net/assets/2022/05/57822/v15/Thumbnail.0000057.jpg",
      "has_preview": true,
      "access_info_list": [],
      "running_time": "0:24:00.066000",
      "progressbar": null,
      "item_expire_datetime": null,
      "in_app_download": true,
      "is_avod": false,
      "is_free": false,
      "is_viewing": true,
      "products": [],
      "episode_products": [
        {
          "id": 73401,
          "name": "은혼 2기 DASH편 2 대여",
          "list_price": 700,
          "period": "7 day",
          "promotion": null
        },
        {
          "id": 73400,
          "name": "은혼 2기 DASH편 2 소장",
          "list_price": 1500,
          "period": "0 day",
          "promotion": null
        }
      ],
      "published_datetime": "2022-06-07T00:00:00.138778",
      "access_type": null,
      "is_available": false
    },
    {
      "id": 54679,
      "title": "은혼 2기 DASH편",
      "subject": "연하장은 붓펜으로 써라 / 카카오보다 마음",
      "description": "은혼 204화는 철지난 연하장과 발렌타인데이를 소재로, 애니메이션 사상 유례를 찾아보기 힘들 정도로 황당무계 상식 배격 애니인 은혼이기에 가능한 기상천외하고 상상을 초월한 스토리가 전개된다.",
      "episode_num": "3",
      "episode_order": 3,
      "thumbnail_path": "https://thumbnail.laftel.net/assets/2022/05/57823/v15/Thumbnail.0000057.jpg",
      "has_preview": true,
      "access_info_list": [],
      "running_time": "0:23:59.066000",
      "progressbar": null,
      "item_expire_datetime": null,
      "in_app_download": true,
      "is_avod": false,
      "is_free": false,
      "is_viewing": true,
      "products": [],
      "episode_products": [
        {
          "id": 73399,
          "name": "은혼 2기 DASH편 3 대여",
          "list_price": 700,
          "period": "7 day",
          "promotion": null
        },
        {
          "id": 73398,
          "name": "은혼 2기 DASH편 3 소장",
          "list_price": 1500,
          "period": "0 day",
          "promotion": null
        }
      ],
      "published_datetime": "2022-06-07T00:00:00.138778",
      "access_type": null,
      "is_available": false
    }
  ]
}
```

<br/><br/>

### ✏️ 애니메이션별 리뷰 목록

#### 애니메이션별 리뷰 수

> `GET` https://laftel.net/api/reviews/v1/count/
> | Query String | value | 내용 |
> | --- | --- | --- |
> | item_id | [애니메이션 번호] | 해당 애니메이션에 달린 리뷰 수 |

```json
{ "count": 334 }
```

<br/>

#### 애니메이션 평점 상세

> `GET` https://laftel.net/api/items/v1/{애니메이션 번호}/statistics/

```json
{
  "average_score": "4.4",
  "count_score": 11719,
  "count_score_05": 279,
  "count_score_10": 125,
  "count_score_15": 79,
  "count_score_20": 135,
  "count_score_25": 175,
  "count_score_30": 522,
  "count_score_35": 559,
  "count_score_40": 1503,
  "count_score_45": 1133,
  "count_score_50": 7209
}
```

<br/>

#### 애니메이션 리뷰 목록

> `GET` https://laftel.net/api/reviews/v2/list/
> | Query String | value | 내용 |
> | --- | --- | --- |
> | item_id | [애니메이션 번호] | 해당 애니메이션 조회 |
> | sorting | like | 좋아요순 조회 |
> | | created | 최신순 조회 |
> | limit | int | 한번에 불러올 리뷰 수 |

```json
{
  "next": "https://laftel.net/api/reviews/v2/list/?cursor=cD0yMDIyLTA4LTAyKzAwJTNBMTYlM0EzNC44OTM3NTg%3D&item_id=22114&limit=20&sorting=created",
  "previous": null,
  "results": [
    {
      "id": 34355927,
      "is_click_like": false,
      "count_like": 0,
      "profile": {
        "id": 4274491,
        "name": "긴토키여자친구(gin********)",
        "image": "https://image.laftel.net/profiles/default/37710afc-0caa-4ea3-bd6d-1c900674141e.jpg",
        "profile_rank": {
          "rank": 1,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "제 남자친구가 나와서 좋아요",
      "created": "2022-08-23T00:14:24.746998",
      "modified": "2022-08-23T00:14:24.750354",
      "is_spoiler": false
    },
    {
      "id": 34346179,
      "is_click_like": false,
      "count_like": 2,
      "profile": {
        "id": 4919615,
        "name": "김비둘기(am9***)",
        "image": "https://image.laftel.net/profiles/default/298345b5-7980-48a6-8975-8066de693d95.jpg",
        "profile_rank": {
          "rank": 1,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "전X선 브레이크가 있는것만 해도 다된것인데 여기에 일국경성같은 레전드 편이 다있어 그럼 뭐야짱이지",
      "created": "2022-08-16T01:06:31.351694",
      "modified": "2022-08-16T01:06:31.354871",
      "is_spoiler": false
    },
    {
      "id": 34346138,
      "is_click_like": false,
      "count_like": 10,
      "profile": {
        "id": 5705714,
        "name": "laftel_r9q8d(mol******)",
        "image": "https://image.laftel.net/profiles/default/48363a65-24d6-45a0-9eac-8c1726656c63.png",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 4.5,
      "content": "아니 담배 검열해서 애들 얼굴 가리는 거 ㄱ킹받네.... 이럴거면 걍 19세로 해줘 분명 욕인데 자막에는 안 나옴 너무 검열해서 은혼 그대로의 맛이 안 살잖아.",
      "created": "2022-08-16T01:01:32.890458",
      "modified": "2022-08-16T01:02:21.115695",
      "is_spoiler": false
    },
    {
      "id": 29608353,
      "is_click_like": false,
      "count_like": 1,
      "profile": {
        "id": 35066,
        "name": "카게카게(121****)",
        "image": "https://image.laftel.net/profiles/default/58888b41-8ecd-4f4e-a890-24b2023d7f29.png",
        "profile_rank": {
          "rank": 4,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "진짜 스키장편은 볼때마다 웃김 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
      "created": "2022-08-15T04:29:09.185811",
      "modified": "2022-08-15T04:29:09.190168",
      "is_spoiler": false
    },
    {
      "id": 34341379,
      "is_click_like": false,
      "count_like": 0,
      "profile": {
        "id": 5657897,
        "name": "laftel_87wxf(sh0*****)",
        "image": "https://image.laftel.net/profiles/default/257801c8-eda4-4401-8672-509080db808b.png",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "제발 들여와주세요",
      "created": "2022-08-13T01:15:50.981165",
      "modified": "2022-08-13T01:15:50.984448",
      "is_spoiler": false
    },
    {
      "id": 34336328,
      "is_click_like": false,
      "count_like": 0,
      "profile": {
        "id": 380139,
        "name": "billyf04(bil*****)",
        "image": "https://image.laftel.net/profiles/default/48363a65-24d6-45a0-9eac-8c1726656c63.png",
        "profile_rank": {
          "rank": 0,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "띵작",
      "created": "2022-08-09T20:42:24.806641",
      "modified": "2022-08-09T20:42:24.812330",
      "is_spoiler": false
    },
    {
      "id": 34336094,
      "is_click_like": false,
      "count_like": 3,
      "profile": {
        "id": 4338593,
        "name": "lovedy281(lov******)",
        "image": "https://image.laftel.net/profiles/default/58888b41-8ecd-4f4e-a890-24b2023d7f29.png",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 0.0,
      "content": "이거 장편이라 건들기가 조심스러운데 1기 꼭 봐야 하나요?",
      "created": "2022-08-09T16:10:00.720609",
      "modified": "2022-08-09T16:10:00.725108",
      "is_spoiler": false
    },
    {
      "id": 34335834,
      "is_click_like": false,
      "count_like": 0,
      "profile": {
        "id": 5123352,
        "name": "바나나진(aji******)",
        "image": "https://image.laftel.net/profiles/default/67dd3fc0-da6f-466d-a206-9c4db3163760.jpg",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "웨않바..?",
      "created": "2022-08-09T12:21:56.857495",
      "modified": "2022-08-09T12:21:56.861048",
      "is_spoiler": false
    },
    {
      "id": 34335630,
      "is_click_like": false,
      "count_like": 3,
      "profile": {
        "id": 5102068,
        "name": "딸기(cjs****)",
        "image": "https://image.laftel.net/profiles/default/58888b41-8ecd-4f4e-a890-24b2023d7f29.png",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "신파치누나는 너무 재미없고 싫다 누구의 연인인지도 모르겠고 흐름을깨고 그냥 카츠라랑 엘리자베스가 더나왔음 좋겠고 사실 최애는 히치카타상 마요ㅠ",
      "created": "2022-08-09T05:36:38.587002",
      "modified": "2022-08-09T05:48:42.607779",
      "is_spoiler": false
    },
    {
      "id": 34329085,
      "is_click_like": false,
      "count_like": 0,
      "profile": {
        "id": 4173877,
        "name": "머랭쿠키상자(188******)",
        "image": "https://image.laftel.net/profiles/default/48363a65-24d6-45a0-9eac-8c1726656c63.png",
        "profile_rank": {
          "rank": 1,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "화면 16:9로 바뀐것도 너무 좋고 사천왕 스즈란편에 사무라이하트랑 벚꽃만월 들을 생각 하니까 너무 설렘...\n갓프텔 진짜 사랑해요ㅠㅠㅠㅠ",
      "created": "2022-08-05T13:27:23.307761",
      "modified": "2022-08-05T13:27:23.311014",
      "is_spoiler": true
    },
    {
      "id": 34327010,
      "is_click_like": false,
      "count_like": 2,
      "profile": {
        "id": 2190861,
        "name": "Tea's(shi**********)",
        "image": "https://image.laftel.net/profiles/default/257801c8-eda4-4401-8672-509080db808b.png",
        "profile_rank": {
          "rank": 0,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "너무 재밋음.. 2기가 시리어스랑 개그편도 적당히 섞여 있어서 최애 시즌임ㅠㅠ 너무 재밌다",
      "created": "2022-08-04T01:23:30.427334",
      "modified": "2022-08-04T01:23:30.431637",
      "is_spoiler": false
    },
    {
      "id": 34324229,
      "is_click_like": false,
      "count_like": 2,
      "profile": {
        "id": 1427150,
        "name": "어질어질퍼레이드(rla*******)",
        "image": "https://image.laftel.net/profiles/default/5223c8da-b946-413c-b123-d8e087d78da3.jpg",
        "profile_rank": {
          "rank": 5,
          "continued_membership_days": null
        }
      },
      "score": 0.0,
      "content": "아니 사무라이 하트를 어떻게 스킵해요ㅕ 진짜....",
      "created": "2022-08-02T03:15:06.779142",
      "modified": "2022-08-02T03:15:06.784850",
      "is_spoiler": false
    }
  ]
}
```
