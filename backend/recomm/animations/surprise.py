import os
from dotenv import load_dotenv, find_dotenv
import pandas as pd
import numpy as np
from pymongo import MongoClient

from surprise import Reader
from surprise import SVD
from surprise import Dataset
from surprise import accuracy
from surprise.model_selection import train_test_split
from surprise.dataset import DatasetAutoFolds

# 환경변수 불러오기
load_dotenv(find_dotenv())
HOST = os.environ["MONGO_HOST"]
USER = os.environ["MONGO_USER"]
PASS = os.environ["MONGO_PASS"]
PORT = int(os.environ["MONGO_PORT"])

# DB 연결
client = MongoClient("mongodb://" + USER + ":" + PASS + "@" + HOST, PORT)

db = client.animations
dbcol_info = db.ani_info
dbcol_review = db.ani_review
dbcol_log = db.ani_log


# 애니 정보 불러오기
ani_df = pd.DataFrame(dbcol_info.find({}, {"_id": 0, "id": 1, "name": 1, "series_id": 1}))
print(ani_df.head())

# 평가 데이터 불러오기
rating_df = pd.DataFrame(dbcol_review.find({}, {"_id": 0, "profile": 1, "animation": 1, "score": 1 }))
rating_df.rename(columns={"profile": "user_id", "animation": "ani_id"}, inplace=True)
print(rating_df.head())

# 애니정보-평가 합치기
ani_ratings = pd.merge(rating_df, ani_df, left_on="ani_id", right_on="id")
ani_ratings = ani_ratings[["user_id", "ani_id", "score", "name"]]
print(ani_ratings.head())

# ani_ratings.csv 파일로 언로드 시 인덱스와 헤더를 모두 제거한 새로운 파일 생성.
path = os.path.abspath(os.path.join(os.getcwd(), "model", "data"))
ani_ratings.to_csv(path + "/ani_ratings.csv", index=False, encoding="utf-8")

def get_unseen_surprise(ani_ratings, ani_id, user_id):
    # 입력값으로 들어온 userId에 해당하는 사용자가 평점을 매긴 모든 도서를 리스트로 생성
    seen_ani = ani_ratings[ani_ratings["user_id"]==user_id]["ani_id"].tolist()

    # 모든 도셔의 ISBN를 리스트로 생성.
    ani_list = ani_df["id"].tolist()

    # 이미 평점을 매긴 애니의 id를 제외한 후 리스트로 생성
    unseen_ani = [ani for ani in ani_list if ani not in seen_ani]
    print("평점 매긴 애니 수: ", len(seen_ani), "\n추천 대상 애니 수: ", len(unseen_ani), "\n전체 애니 수: ", len(ani_list))

    return unseen_ani

def recomm_ani_by_surprise(algo, user_id, unseen_ani, top_n):

  # 알고리즘 객체의 predict() 메서드를 평점이 없는 영화에 반복 수행한 후 결과를 list 객체로 저장
  predictions = [algo.predict(str(user_id), str(ani_id)) for ani_id in unseen_ani]
  # predictions list 객체는 surprise의 Prediction 객체를 원소로 가지고 있음.
  # [Prediction(uid='276847', iid='1', est=3.69), Prediction(uid='276847', iid='2', est=2.98),,,,]

  # 이를 est 값으로 정렬하기 위해서 아래의 sortkey_eat 함수를 정의함.
  # sortkey_est 함수는 list 객체의 sort() 함수의 키 값으로 사용되어 정렬 수행.
  def sortkey_est(pred):
    return pred.est
    
  # sortkey_est() 반환값의 내림 차순으로 정렬 수행하고 top_n개의 최상위 값 추출.
  predictions.sort(key=sortkey_est, reverse=True)
  top_predictions = predictions[:top_n]

  # top_n으로 추출된 영화의 정보 추출, 영화 아이디, 추천 예상 평점, 제목 추출
  top_ani_ids = [ int(pred.iid) for pred in top_predictions]
  top_ani_rating = [ pred.est for pred in top_predictions]
  top_ani_names = ani_ratings[ani_ratings.isin(top_ani_ids)]["name"]

  top_ani_preds = [ (id, rating) for id, rating in zip(top_ani_ids, top_ani_rating)]
  return top_ani_preds


##########################################################################################

def surprise_recomm(user_id, ani_id, score):
    df = pd.read_csv("./data/ani_ratings.csv")
    reader = Reader(rating_scale=(0.5, 5))
    data = Dataset.load_from_df(df[["user_id", "ani_id", "score"]], reader=reader)

    train, test = train_test_split(data, test_size=.25, random_state=0)

    # 수행 시마다 동일한 결과를 도출하기 위해 random_state 설정
    algo = SVD(n_factors=50, random_state=0)

    # 학습 데이터 세트로 학습하고 나서 테스트 데이터 세트로 평점 예측 후 RMSE 평가
    algo.fit(train)
    predictions = algo.test(test)
    accuracy.rmse(predictions)

    algo = SVD(n_epochs=20, n_factors=50, random_state=0)
    algo.fit(train)

    # user_id: 4523846의 ani_id 데이터를 추출해 ani_id: 39986 데이터가 있는지 확인.
    user_id = user_id
    ani_id = ani_id
    animations = ani_ratings[ani_ratings["user_id"] == user_id]["ani_id"]

    if animations[animations==ani_id].count() == 0 :
        print("평점 없음")

    # 도서에 대한 상세 속성 정보 DataFrame 로딩

    print(ani_df[ani_df["id"]==ani_id])

    uid = str(user_id)
    iid = str(ani_id)

    unseen_ani = get_unseen_surprise(ani_ratings, ani_df, user_id)
    top_ani_preds = recomm_ani_by_surprise(algo, user_id, unseen_ani, top_n=14)
    
    return top_ani_preds