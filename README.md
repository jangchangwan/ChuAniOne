# 츄애니원 (애니메이션 추천 서비스)

[TOC]

📆 **프로젝트 진행기간 : 2022/08/22 - 2022/10/07** 

🎈 **팀원소개**

| 이름  | 역할                 |
| --- | ------------------ |
| 금동운 | BigData & Frontend |
| 박유주 | Backend            |
| 안세영 | Backend & Server   |
| 이소영 | BigData & Backend  |
| 이승현 | Frontend           |
| 장창완 | Frontend           |

📽 [**UCC 보러가기**](https://youtu.be/oGQ1oaCvIBA)

![logo2](README.assets/logo2.png)

---

## 01 서비스 소개

> #### 애니메이션 빅데이터 추천 서비스
> 
> "츄애니원"은 유저들의 선호도를 기반으로 잠재요인의 값을 구하여 
> 
> 각각의 유저에게 애니메이션을 맞춤형으로 제공하는 서비스이다.

---

## 02 주요 기능

✔ 애니메이션 추천

✔ 애니메이션에 대한 정보와 리뷰, 톡톡을 통한 소통공간

✔ 유저가 본 애니메이션을 분석하여 만든 일본어 단어장

✔ 취향이 비슷한 사람들과 소통의 공간, 오픈채팅

---

## 03 "츄애니원" 서비스 화면

#### **회원가입 및 로그인**

✨ **회원가입**

![signup](README.assets/signup.gif)

![인증](README.assets/인증.gif)

✨ **로그인**

![login](README.assets/login.gif)

✨ **비밀번호 찾기**

![findpwd](README.assets/findpwd.gif)

---

#### 마이페이지

![mypageTap](README.assets/mypageTap.gif)

✨ **애니메이션**

![myani](README.assets/myani.gif)

✨ **리뷰**

![myreview](README.assets/myreview.gif)

✨ **일본어 단어장**

![myvoca](README.assets/myvoca.gif)

✨ **회원정보 변경**

![changeInfo](README.assets/changeInfo.gif)

---

#### 메인페이지

![메인](README.assets/메인.gif)

---

#### 소개페이지

![nav](README.assets/nav.gif)

![intro](README.assets/intro.gif)

---

#### 검색페이지

![검색페이지네이션](README.assets/검색페이지네이션.gif)

![검색필터링](README.assets/검색필터링.gif)

---

#### 상세페이지

![상세페이지](README.assets/상세페이지.gif)

✨ **리뷰**

![상세페이지리뷰](README.assets/상세페이지리뷰.gif)

**✨ 톡톡**

![상세페이지톡톡](README.assets/상세페이지톡톡.gif)

---

#### 오픈채팅

**✨ 방만들기**

![채팅만들기](README.assets/채팅만들기.gif)

**✨ 채팅방 입장/퇴장**

![채팅입장퇴장](README.assets/채팅입장퇴장.gif)

**✨ 채팅**

![채팅열기닫기](README.assets/채팅열기닫기.gif)

![채팅치기](README.assets/채팅치기.gif)

**✨ 채팅방 정보 수정**

![채팅방수정](README.assets/채팅방수정.gif)

**✨ 채팅방 삭제**

![채팅방삭제](README.assets/채팅방삭제.gif)

---

#### 빅보카

![bigvoca](README.assets/bigvoca.gif)

---

## 04 개발환경

📌 **Backend**
- Django 4.1.1
- djongo 1.3.6
- pymongo 3.12.3
- spring-boot 2.7.3
- spring-security 2.7.3
- docker 20.10.18
- docker-compose 2.1.0
- mysql 5.7
- nginx 1.23.1

📌 **Frontend**

- VSCode (IDE)
- react 18.2.0
- react-canvas-confetti 1.3.0
- react-chartjs-2 4.3.1
- react-dom 18.2.0
- react-material-ui-carousel 3.4.2
- react-player 2.10.1
- react-redux 8.0.2
- react-router-dom 6.3.0
- redux 4.2.0
- redux-persist 6.0.0
- redux-thunk 2.4.1
- sockjs-client 1.6.1
- styled-components 5.3.5
- typescript 4.8.3
- framer-motion 7.3.6
- 
- @mui/icons-material 5.10.3
- @mui/material 5.10.3
- @reduxjs/toolkit 1.8.5
- @stomp/stompjs 6.1.2
- @types/canvas-confetti 1.4.3
- @types/chart.js 2.9.37
- @types/react 18.0.20
- @types/react-dom 18.0.6
- @types/react-redux 7.1.24
- @types/sockjs-client 1.5.1
- @types/stompjs 2.3.5

📌 **BigData**
- keras 2.10.0
- konlpy 0.6.0
- numpy 1.23.3
- pandas 1.5.0
- scikit-learn==1.1.2
- scikit-surprise==1.1.3
- scipy 1.9.1
- surprise 0.1
- tensorflow 2.10.0
- MongoDB 4.4.16


📌 **CI/CD**

---

## 05 서비스 아키텍처

![image-20221006111907348](README.assets/image-20221006111907348.png)

---

## 06 기술 특이점

📌 **Stomp를 활용한 socket 통신**

- **Stomp** : Websocket 위에서 동작하는 텍스트 기반의 메세지 전송 프로토콜

- 메세지를 Controller 어노테이션이 적용된 객체를 이용해 조직적으로 관리할 수 있으며 Spring Security를 적용해 메세지를 보호할 수 있다.

- Messaging Protocol을 만들고 메세지 형식을 커스터마이징 할 필요가 없다.

- STOMP의 "destination" 및 Message Type을 기반으로 메세지를 보호하기 위해 Spring Security를 사용할 수 있다.

<img src="README.assets/image-20221006135628741.png" alt="image-20221006135628741" style="zoom:80%;" />

📌 **빅데이터 알고리즘 1 - 컨텐츠 기반 필터링**

- Okt를 활용하고 morphs를 사용하여 형태소 분석을 한 뒤 불용어 처리로 데이터 정제

- sklearn의 TfidfVectorizer 라이브러리를 활용하여 분석진행

- sklearn의 cosine_similarity 라이브러리를 활용하여 유사도 계산

📌 **빅데이터 알고리즘 2 - 협업 필터링 + 컨텐츠 기반 필터링**

- scipy의 svds 라이브러리를 활용하여 U, sigma, V 행렬을 반환하고 diag를 이용해 변환하고 내적을 수행하는 특이값분해를 진행하여 1차 추출

- sklearn의 TfidfVectorizer, cosine_similarity 라이브러리를 활용하여 2차 추출

---

## 07 협업 툴

- **Gitlab**

![image-20221006112132474](README.assets/image-20221006112132474.png)

- **Jira**

![image-20221006112243398](README.assets/image-20221006112243398.png)

- **Notion**

![image-20221006112354591](README.assets/image-20221006112354591.png)

---

## 08 서비스 설계

- **ERD**
  
  ![img](https://cdn.discordapp.com/attachments/1012637429376753677/1027439856579776543/unknown.png)

- **기능 명세서**

![image-20221006112549162](README.assets/image-20221006112549162.png)

- **Figma**

![image-20221006112716610](README.assets/image-20221006112716610.png)

- **컴포넌트 구조 설계**

![image-20221006112759543](README.assets/image-20221006112759543.png)

- **Rest API**

![image-20221006112833140](README.assets/image-20221006112833140.png)
