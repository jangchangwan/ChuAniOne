# π Laftel API

| λ²νΈ | λ΄μ©                                            | μμΈ                                                                                                              |
| ---- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1οΈβ£   | [κ²μ νν° μ λ³΄](#βοΈ-κ²μ-νν°-μ λ³΄)            |                                                                                                                   |
| 2οΈβ£   | [μ λλ©μ΄μ κ²μ](#βοΈ-μ λλ©μ΄μ-κ²μ)          |                                                                                                                   |
| 3οΈβ£   | [μμΌλ³ μ μ](#βοΈ-μμΌλ³-μ μ)                  |                                                                                                                   |
| 4οΈβ£   | [μ λλ©μ΄μ μ‘°ν](#βοΈ-μ λλ©μ΄μ-μ‘°ν)          | [μ λλ©μ΄μ μμΈ μ λ³΄](#μ λλ©μ΄μ-μμΈ-μ λ³΄)<br/>[μλ¦¬μ¦ μ‘°ν](#μλ¦¬μ¦-μ‘°ν)<br/>[μνΌμλ μ‘°ν](#μνΌμλ-μ‘°ν) |
| 5οΈβ£   | [μ λλ©μ΄μλ³ λ¦¬λ·°](#βοΈ-μ λλ©μ΄μλ³-λ¦¬λ·°-λͺ©λ‘) | [λ¦¬λ·° μ](#μ λλ©μ΄μλ³-λ¦¬λ·°-μ)<br/>[νμ  μμΈ](#μ λλ©μ΄μ-νμ -μμΈ)<br/>[λ¦¬λ·° λͺ©λ‘](#μ λλ©μ΄μ-λ¦¬λ·°-λͺ©λ‘)    |

<br/><hr/><br/>

## βοΈ ν€λ μ€μ 

- request headerμ `"laftel": "TeJava"` ν¬ν¨ν΄μ μ λ¬

<br/>

### βοΈ κ²μ νν° μ λ³΄

> `GET` https://laftel.net/api/v1.0/info/discover/

```json
{
  "brands": ["μ λλ§₯μ€ νλ¬μ€", "μ λνλ¬μ€", "kt alpha", "λμ", "κΈ°ν"],
  "genres": [
    "BL",
    "GL λ°±ν©",
    "SF",
    "κ°κ·Έ",
    "κ³΅ν¬",
    "λλΌλ§",
    "λ‘λ§¨μ€",
    "λͺ¨ν",
    "λ¬΄ν",
    "λ―Έμ€ν°λ¦¬",
    "λ²μ£",
    "μ±μΈ",
    "μ€λ¦΄λ¬",
    "μ€ν¬μΈ ",
    "μλλ¬Ό",
    "μλ",
    "μμ΄λ",
    "μ‘μ",
    "μμ",
    "μμ",
    "μ΄μΈκ³",
    "μΌμ",
    "μ¬λ",
    "μΆλ¦¬",
    "μΉμ ",
    "νΉμ΄¬",
    "ννμ§",
    "νλ "
  ],
  "tags": [
    "κ°μ‘±",
    "κ°λ",
    "κ²μ",
    "λλ¬Ό",
    "λμν",
    "λλμΈμ",
    "λ‘λ΄",
    "λ£¨νλ¬Ό",
    "λ§λ²μλ",
    "λ¨ΌμΉν¨",
    "λ¬΄κ±°μ",
    "λ°°ν",
    "λ±νμ΄μ΄",
    "λ³΅μ",
    "μΌκ°κ΄κ³",
    "μμν",
    "μ μλ",
    "μ±μ₯",
    "μ¬ν",
    "μκ°μ¬ν",
    "μ­νλ ",
    "μ°μμΈ",
    "μ΄ν",
    "μ€νμΏ ",
    "μκ΄΄ λ° κ΄΄λ¬Ό",
    "μ‘μ",
    "μ μΉ",
    "μ’λΉ",
    "μ£Όμ²΄μ  μ¬μ±",
    "μ§μ¬λ",
    "μ² ν",
    "ν΄λ§",
    "νκ΅"
  ],
  "years": {
    "animation": [
      "2022λ 4λΆκΈ°",
      "2022λ 3λΆκΈ°",
      "2022λ 2λΆκΈ°",
      "2022λ 1λΆκΈ°",
      "2021λ 4λΆκΈ°",
      "2021λ 3λΆκΈ°",
      "2021λ 2λΆκΈ°",
      "2021λ 1λΆκΈ°",
      "2020λ",
      "2019λ",
      "2018λ",
      "2017λ",
      "2016λ",
      "2015λ",
      "2014λ",
      "2013λ",
      "2012λ",
      "2011λ",
      "2010λ",
      "2000λλ",
      "2000λλ μ΄μ "
    ]
  },
  "productions": [
    "λ³Έμ¦",
    "μΏν μ λλ©μ΄μ",
    "λ§€λνμ°μ€",
    "A-1Pictures",
    "μ ν¬νμ΄λΈ",
    "WitStudio",
    "νλ‘λμ I.G",
    "P.A.Works",
    "J.C.Staff",
    "μ€ννΈ",
    "λνκ³΅λ°©",
    "μ€νλμ€ λ",
    "μ€λ² λ§ν¬",
    "μ€νλμ€ νΌμλ‘",
    "MAPPA",
    "νμ΄νΈν­μ€",
    "λΌλ₯΄μΌ",
    "νΈλ¦¬κ±°",
    "ν΄λ¦¬κ³€ ν½μ³μ€",
    "μ¬νλΌμ΄νΈ"
  ]
}
```

<br/><br/>

### βοΈ μ λλ©μ΄μ κ²μ

> `GET` https://laftel.net/api/search/v1/discover/  
> | Query String | value | λ΄μ© |
> | --- | --- | --- |
> | sort | rank | λ­νΉ μ |
> | | name | μ΄λ¦ μ |
> | | recent | μ΅μ  μ |
> | | cnt_eval | νκ° λ§μ μ |
> | | avg_rating | νκ° λμ μ |
> | brands | [λΈλλλͺ] | ν΄λΉ λΈλλ μν |
> | genres | [μ₯λ₯΄λͺ] | ν΄λΉ μ₯λ₯΄ μν |
> | tags | [νκ·Έλͺ] | ν΄λΉ νκ·Έκ° ν¬ν¨λ μν |
> | years | [λΆκΈ°λͺ] | ν΄λΉ νΌκΈ°μ μν |
> | ending | true/false | λ°©μμ€μΈ μν/X |
> | viewable | true | νκΆ λ§λ£ X |
> | size | int | ν νμ΄μ§μ λ³΄μ¬μ€ μν μ |
> | offset | int | λ λ²μ§Έ μ£Όμλ₯Ό λ§λ€κΈ° μν΄ κΈ°μ€μ΄ λλ μ£Όμμ λν΄μ§ κ° |

```json
{
  "count": 6931,
  "results": [
    {
      "id": 39986,
      "name": "μ£Όμ νμ  part 1",
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
      "genres": ["ννμ§", "μ‘μ"],
      "medium": "TVA",
      "distributed_air_time": "μΌμμΌ",
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
      "name": "(λ¬΄μ­μ ) κ·λ©Έμ μΉΌλ ",
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
      "genres": ["ννμ§", "μ‘μ", "μλλ¬Ό"],
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
      "name": "μνΌ 1κΈ°",
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
      "genres": ["ννμ§", "μ‘μ", "κ°κ·Έ", "μ±μΈ", "μλλ¬Ό", "λ¬΄ν"],
      "medium": "TVA",
      "distributed_air_time": "νμμΌ",
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

### βοΈ μμΌλ³ μ μ

: μΌμ£ΌμΌ λ°©μ λͺ©λ‘

> `GET` https://laftel.net/api/search/v2/daily/

```json
[
  {
    "id": 40902,
    "name": "μ€λ²λ‘λ 4κΈ°",
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
    "genres": ["μ΄μΈκ³", "ννμ§", "μ‘μ", "μ±μΈ"],
    "medium": "TVA",
    "distributed_air_time": "μμμΌ",
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
    "name": "κ°μλ²¨!!",
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
    "genres": ["μ΄μΈκ³", "ννμ§", "μ‘μ", "κ°κ·Έ"],
    "medium": "TVA",
    "distributed_air_time": "λͺ©μμΌ",
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

### βοΈ μ λλ©μ΄μ μ‘°ν

#### μ λλ©μ΄μ μμΈ μ λ³΄

> `GET` https://laftel.net/api/items/v2/{μ λλ©μ΄μ λ²νΈ}/

```json
{
  "id": 22114,
  "name": "μνΌ 2κΈ° DASHνΈ",
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
  "content": "μλ μλ λ§κΈ°, νλμμ λ΄λ €μ¨ βμ²μΈβμ μΉ¨λ΅μΌλ‘ μ μμ΄ λ°μνλ€. λ§λΆλ€μ κ²°κ΅­ μ²μΈκ³Όμ κ³΅μ‘΄μ μν΄ μ¬λλ€μκ² κ²μ μμ§ν  μ μλλ‘ νλλ Ήμ λ΄λ €μ μ¬λ¬΄λΌμ΄κ° ν° μκΈ°λ₯Ό κ²ͺκ³  μλ€. κ·Έλ¬λ μ¬λ¬΄λΌμ΄ μ μ μ κ΅³κ² κ°μ§ν λ¨μκ° μμμΌλ κ·Έμ μ΄λ¦μ μ¬μΉ΄ν κΈ΄ν ν€. λ¨ κ²μ μ’μνλ μ λμ μΈ μ΄ λ¨μκ° λΆν¨ν μλλ₯Ό λλκ°μ λΌμ§λ?! κΈ΄ν ν€κ° λλ£λ€μ λ§λλ©΄μ μΌμ΄λλ λ³λ§ μ½λ―Έλλ¬Ό.",
  "awards": ["λΌνν μ­λ μ λ μΈκΈ° λ­νΉ 100μ"],
  "medium": "TVA",
  "content_rating": "μ±μΈ μ΄μ©κ°",
  "is_ending": false,
  "production": "μ λΌμ΄μ¦",
  "air_year_quarter": "2011λ 2λΆκΈ°|2022λ 3λΆκΈ°",
  "is_dubbed": false,
  "is_laftel_only": false,
  "is_uncensored": false,
  "distributed_air_time": "νμμΌ",
  "is_adult": true,
  "has_free_episode": false,
  "is_avod": false,
  "is_svod": true,
  "is_viewing": true,
  "genres": ["ννμ§", "μ‘μ", "κ°κ·Έ", "μ±μΈ", "μλλ¬Ό", "λ¬΄ν"],
  "cnt_short_review": 336,
  "avg_rating": 4.4,
  "tags": ["λμν", "μΈκ³μΈ", "ννμ§", "μ‘μ", "κ°κ·Έ", "μ±μΈ", "μλλ¬Ό", "λ¬΄ν", "λ§μ", "μμ "],
  "expire_datetime": null,
  "is_episode_existed": true,
  "series_id": 3989,
  "author": ["μλΌμΉ νλ°μν€"],
  "illustrator": ["μλΌμΉ νλ°μν€"],
  "is_wish": false,
  "is_hate": false
}
```

<br/>

#### μλ¦¬μ¦ μ‘°ν

> `GET` https://laftel.net/api/items/v2/series/{μλ¦¬μ¦ λ²νΈ}/?limit=20&offset=0

```json
{
  "count": 9,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 16075,
      "name": "μνΌ 1κΈ°"
    },
    {
      "id": 22114,
      "name": "μνΌ 2κΈ° DASHνΈ"
    },
    {
      "id": 20547,
      "name": "κ·Ήμ₯ν μνΌ : μ μ­νμ΅νΈ"
    },
    {
      "id": 40772,
      "name": "κ·Ήμ₯ν μνΌ μκ²°νΈ : ν΄κ²°μ¬μ¬ μμνλΌ - νκΆ λΆν"
    },
    {
      "id": 24502,
      "name": "μνΌ 3κΈ°"
    },
    {
      "id": 37934,
      "name": "μνΌ 4κΈ° ν¬λ‘λ¦¬νΈ"
    },
    {
      "id": 38253,
      "name": "μνΌ 4κΈ° μλΉ μνΌνΈ 1λΆ"
    },
    {
      "id": 38854,
      "name": "μνΌ 4κΈ° μλΉ μνΌνΈ 2λΆ"
    },
    {
      "id": 40406,
      "name": "μνΌ λ νμ΄λ"
    }
  ]
}
```

<br/>

#### μνΌμλ μ‘°ν

> `GET` https://laftel.net/api/episodes/v2/list/?item_id=22114&sort=oldest&limit=20&show_playback_offset=true&offset=0
> | Query String | value | λ΄μ© |
> | --- | --- | --- |
> | sort | oldest | 1ν λΆν° |
> | | newest | μ΅μ ν |

```json
{
  "count": 59,
  "next": "https://laftel.net/api/episodes/v2/list/?item_id=22114&limit=20&offset=20&sort=oldest",
  "previous": null,
  "results": [
    {
      "id": 54677,
      "title": "μνΌ 2κΈ° DASHνΈ",
      "subject": "λ΄λ°©νμ΄ λλλ©΄ λ€λ€ μ‘°κΈ μ΄λ₯Έμ²λΌ λ³΄μΈλ€",
      "description": "μ λ μνΌμ 1λκ°μ ν΄μ§κΈ°κ° λλκ³  μλ‘μ΄ μ¬κ°λκ² λμ΄ μ€λλ§μ ν΄κ²°μ¬ μ¬λ¬΄μλ₯Ό μ°Ύμκ° μ νμΉ. κ·Έλ°λ° μ¬λ¬΄μ μμ μ¬ λ―μ  λ¨μκ° μλ κ². λ¨μ μ¬λ¬΄μ€μμ λ­ νλκ³  νμ λμλ³΄λ λ¨μ. κ·Έλ°λ° κ·Έ λ¨μλ μμ μ΄ κΈ΄ν ν€λΌκ³  νλ κ². λλμ²΄ 1λκ° λ¬΄μ¨ μΌμ΄ μμκΈΈλ μμ λ΄μ¬λμ²λΌ λ³ν κ±΄μ§ μμν΄νλ μ νμΉ. κ·Έλ°λ° κ·Έλ μ¬ λ―μ  μ¬μκ° λ μ¬λ¬΄μλ‘ λ€μ΄μ€λλ°, κ·Έ μ¬μ μ­μ μμ μ΄ μΉ΄μΏ λΌλΌκ³  νλ κ². 1λ μ¬μ΄ μ³λ μλ κ°μ λͺ¨μ΅μ μ¨λ°κ°λ°μκ³ , ν€λ λͺΈλ§€λ μμ ν μλκ° λΌμ λμμ¨ μΉ΄μΏ λΌ. λΏλ§ μλλΌ 1λμ΄ μλλΌ 2λμ΄ μ§λ¬λ€λ κ². μ΄λ€μκ² κ³Όμ° λ¬΄μ¨ μΌμ΄...?",
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
          "name": "μνΌ 2κΈ° DASHνΈ 1 λμ¬",
          "list_price": 700,
          "period": "7 day",
          "promotion": null
        },
        {
          "id": 73402,
          "name": "μνΌ 2κΈ° DASHνΈ 1 μμ₯",
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
      "title": "μνΌ 2κΈ° DASHνΈ",
      "subject": "μ¬λ¦λ°©νμ΄ λλλ λͺ¨λ μ‘°κΈ μ΄λ₯Έμ²λΌ λ³΄μΈλ€",
      "description": "μμ μ μ μΈν μ£Όλ³μ λͺ¨λ  μ¬λμ΄ μμ μ 1λμ΄λΌκ³  μκ³  μλ 2λ μ¬μ΄μ μμ²­λ λ³νμ λ°μ (?)μ μ΄λ€λλ° μμ λ§ λ€μ²μ Έ μλ€λ μκ΄΄κ°μ λ°λ·κ°λ₯Ό μ°Ύμ μ νμΉ. κ·Έλ°λ° κ·Έκ³³μμλ νλ² μ μΉ΄μΈ λΌλ§μ λ μ‘°κΈ λ§μ΄ ν©λΉνμ§λ§ λ³ν΄ μλ λͺ¨μ΅μ λ³΄κ³ λ μμ°μ€μμ νλ€. μ¬μ§μ΄ μ§μ μ‘°μ λμλ€μ‘°μ°¨λ μκ°μ§λ λͺ»ν λͺ¨μ΅μΌλ‘ λ³ν΄ μλ κ±Έ λ³΄κ³  κ²½μμ κΈμΉ λͺ»νλ€. μ¬μ§μ΄ μ§μ μ‘° λ³ΈλΆλ‘ κ° λ³΄λ μ§μ μ‘° μμ²΄λ μμ΄μ§μ¬μ λ§μ°¬κ°μ§λ‘ μ κΆμ μ°¬ννλ €λ μ§λ¨μΌλ‘ λ°λμ΄ μλ κ². κ·Έλ°λ° νμ§μΉ΄νκ° μμΈμ λ§μ νλλ°...",
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
          "name": "μνΌ 2κΈ° DASHνΈ 2 λμ¬",
          "list_price": 700,
          "period": "7 day",
          "promotion": null
        },
        {
          "id": 73400,
          "name": "μνΌ 2κΈ° DASHνΈ 2 μμ₯",
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
      "title": "μνΌ 2κΈ° DASHνΈ",
      "subject": "μ°νμ₯μ λΆνμΌλ‘ μ¨λΌ / μΉ΄μΉ΄μ€λ³΄λ€ λ§μ",
      "description": "μνΌ 204νλ μ² μ§λ μ°νμ₯κ³Ό λ°λ νμΈλ°μ΄λ₯Ό μμ¬λ‘, μ λλ©μ΄μ μ¬μ μ λ‘λ₯Ό μ°Ύμλ³΄κΈ° νλ€ μ λλ‘ ν©λΉλ¬΄κ³ μμ λ°°κ²© μ λμΈ μνΌμ΄κΈ°μ κ°λ₯ν κΈ°μμ²μΈνκ³  μμμ μ΄μν μ€ν λ¦¬κ° μ κ°λλ€.",
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
          "name": "μνΌ 2κΈ° DASHνΈ 3 λμ¬",
          "list_price": 700,
          "period": "7 day",
          "promotion": null
        },
        {
          "id": 73398,
          "name": "μνΌ 2κΈ° DASHνΈ 3 μμ₯",
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

### βοΈ μ λλ©μ΄μλ³ λ¦¬λ·° λͺ©λ‘

#### μ λλ©μ΄μλ³ λ¦¬λ·° μ

> `GET` https://laftel.net/api/reviews/v1/count/
> | Query String | value | λ΄μ© |
> | --- | --- | --- |
> | item_id | [μ λλ©μ΄μ λ²νΈ] | ν΄λΉ μ λλ©μ΄μμ λ¬λ¦° λ¦¬λ·° μ |

```json
{ "count": 334 }
```

<br/>

#### μ λλ©μ΄μ νμ  μμΈ

> `GET` https://laftel.net/api/items/v1/{μ λλ©μ΄μ λ²νΈ}/statistics/

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

#### μ λλ©μ΄μ λ¦¬λ·° λͺ©λ‘

> `GET` https://laftel.net/api/reviews/v2/list/
> | Query String | value | λ΄μ© |
> | --- | --- | --- |
> | item_id | [μ λλ©μ΄μ λ²νΈ] | ν΄λΉ μ λλ©μ΄μ μ‘°ν |
> | sorting | like | μ’μμμ μ‘°ν |
> | | created | μ΅μ μ μ‘°ν |
> | limit | int | νλ²μ λΆλ¬μ¬ λ¦¬λ·° μ |

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
        "name": "κΈ΄ν ν€μ¬μμΉκ΅¬(gin********)",
        "image": "https://image.laftel.net/profiles/default/37710afc-0caa-4ea3-bd6d-1c900674141e.jpg",
        "profile_rank": {
          "rank": 1,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "μ  λ¨μμΉκ΅¬κ° λμμ μ’μμ",
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
        "name": "κΉλΉλκΈ°(am9***)",
        "image": "https://image.laftel.net/profiles/default/298345b5-7980-48a6-8975-8066de693d95.jpg",
        "profile_rank": {
          "rank": 1,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "μ Xμ  λΈλ μ΄ν¬κ° μλκ²λ§ ν΄λ λ€λκ²μΈλ° μ¬κΈ°μ μΌκ΅­κ²½μ±κ°μ λ μ λ νΈμ΄ λ€μμ΄ κ·ΈλΌ λ­μΌμ§±μ΄μ§",
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
      "content": "μλ λ΄λ°° κ²μ΄ν΄μ μ λ€ μΌκ΅΄ κ°λ¦¬λ κ±° γ±νΉλ°λ€.... μ΄λ΄κ±°λ©΄ κ± 19μΈλ‘ ν΄μ€ λΆλͺ μμΈλ° μλ§μλ μ λμ΄ λλ¬΄ κ²μ΄ν΄μ μνΌ κ·Έλλ‘μ λ§μ΄ μ μ΄μμ.",
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
        "name": "μΉ΄κ²μΉ΄κ²(121****)",
        "image": "https://image.laftel.net/profiles/default/58888b41-8ecd-4f4e-a890-24b2023d7f29.png",
        "profile_rank": {
          "rank": 4,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "μ§μ§ μ€ν€μ₯νΈμ λ³Όλλ§λ€ μκΉ γγγγγγγγγγ",
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
      "content": "μ λ° λ€μ¬μμ£ΌμΈμ",
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
      "content": "λ΅μ",
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
      "content": "μ΄κ±° μ₯νΈμ΄λΌ κ±΄λ€κΈ°κ° μ‘°μ¬μ€λ¬μ΄λ° 1κΈ° κΌ­ λ΄μΌ νλμ?",
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
        "name": "λ°λλμ§(aji******)",
        "image": "https://image.laftel.net/profiles/default/67dd3fc0-da6f-466d-a206-9c4db3163760.jpg",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "μ¨μλ°..?",
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
        "name": "λΈκΈ°(cjs****)",
        "image": "https://image.laftel.net/profiles/default/58888b41-8ecd-4f4e-a890-24b2023d7f29.png",
        "profile_rank": {
          "rank": 2,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "μ νμΉλλλ λλ¬΄ μ¬λ―Έμκ³  μ«λ€ λκ΅¬μ μ°μΈμΈμ§λ λͺ¨λ₯΄κ² κ³  νλ¦μκΉ¨κ³  κ·Έλ₯ μΉ΄μΈ λΌλ μλ¦¬μλ² μ€κ° λλμμ μ’κ² κ³  μ¬μ€ μ΅μ λ νμΉμΉ΄νμ λ§μγ ",
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
        "name": "λ¨Έλ­μΏ ν€μμ(188******)",
        "image": "https://image.laftel.net/profiles/default/48363a65-24d6-45a0-9eac-8c1726656c63.png",
        "profile_rank": {
          "rank": 1,
          "continued_membership_days": null
        }
      },
      "score": 5.0,
      "content": "νλ©΄ 16:9λ‘ λ°λκ²λ λλ¬΄ μ’κ³  μ¬μ²μ μ€μ¦λνΈμ μ¬λ¬΄λΌμ΄ννΈλ λ²κ½λ§μ λ€μ μκ° νλκΉ λλ¬΄ μ€λ ...\nκ°νν μ§μ§ μ¬λν΄μγ γ γ γ ",
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
      "content": "λλ¬΄ μ¬λ°μ.. 2κΈ°κ° μλ¦¬μ΄μ€λ κ°κ·ΈνΈλ μ λΉν μμ¬ μμ΄μ μ΅μ  μμ¦μγ γ  λλ¬΄ μ¬λ°λ€",
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
        "name": "μ΄μ§μ΄μ§νΌλ μ΄λ(rla*******)",
        "image": "https://image.laftel.net/profiles/default/5223c8da-b946-413c-b123-d8e087d78da3.jpg",
        "profile_rank": {
          "rank": 5,
          "continued_membership_days": null
        }
      },
      "score": 0.0,
      "content": "μλ μ¬λ¬΄λΌμ΄ ννΈλ₯Ό μ΄λ»κ² μ€ν΅ν΄μγ μ§μ§....",
      "created": "2022-08-02T03:15:06.779142",
      "modified": "2022-08-02T03:15:06.784850",
      "is_spoiler": false
    }
  ]
}
```
