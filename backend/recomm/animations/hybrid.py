import dotenv
import os
from pymongo import MongoClient
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# 환경변수 불러오기
dotenv.load_dotenv(dotenv.find_dotenv())
HOST = os.environ["MONGO_HOST"]
USER = os.environ["MONGO_USER"]
PASS = os.environ["MONGO_PASS"]
PORT = int(os.environ["MONGO_PORT"])

# DB 연결
client = MongoClient("mongodb://" + USER + ":" + PASS + "@" + HOST, PORT)

db = client.animations
dbcol_info = db.ani_info
dbcol_review = db.ani_review
dbcol_feat = db.ani_feature
dbcol_log = db.ani_log

# 애니 정보 불러오기
ani_df = pd.DataFrame(dbcol_info.find({}, {"id": 1, "name": 1, "series_id": 1}))
ani_df.drop('_id', axis=1, inplace=True)
ani_df.columns = ["ani_id", "ani_name", "series_id"]

# 평가 데이터 불러오기
rating_df = pd.DataFrame(dbcol_review.find({}))
rating_df = rating_df[["profile", "animation", "score"]]
rating_df.columns = ["user_id", "ani_id", "score"]

# 데이터 중복 확인
rating_df["user_id"].nunique()
rating_df.drop_duplicates(subset=["user_id"], inplace=True)
rating_df = rating_df.dropna(how="any")

# 결측값 제거
rating_df["user_id"].replace("", np.nan, inplace=True)
rating_df = rating_df.dropna(how="any") # Null값이 존재하는 행 제거


print("Null값 유무: ", rating_df.isnull().values.any())
print("총 데이터 수: ", len(rating_df))


# 형태소 분석이 이뤄진 데이터 불러오기
feat_df = pd.DataFrame(dbcol_feat.find({}, {"id": 1, "feat_str": 1}))


# 사용자 - 애니 pivot table 생성
user_ani_ratings_df = rating_df.pivot(index="user_id", columns="ani_id", values="score").fillna(0)


ani_df_id_to_idx = dict(zip(ani_df["ani_id"], ani_df.index))
ani_df_idx_to_series = dict(zip(ani_df.index, ani_df["series_id"]))
ani_df_id_to_series = dict(zip(ani_df["ani_id"], ani_df["series_id"]))
ani_df_id_to_name = dict(zip(ani_df["ani_id"], ani_df["ani_name"]))
feat_df_id_to_idx = dict(zip(feat_df["id"], feat_df.index))
feat_df_idx_to_feat = dict(zip(feat_df.index, feat_df["feat_str"]))


def recommend_ani(df_svd_preds, userId, ori_ani_df, ori_score_df, n):

    # 최종적으로 만든 pred_df에서 사용자 index에 따라 애니 데이터 정렬 -> 애니 평점이 높은 순으로 정렬 됌
    sorted_user_predictions = df_svd_preds.loc[userId].sort_values(ascending=False)
    
    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아낸다.
    user_data = ori_score_df[ori_score_df.user_id == userId]
        
    # 위에서 뽑은 user_data와 원본 애니 데이터를 합친다.
    user_history = user_data.merge(ori_ani_df, on = 'ani_id')
    # user_history = pd.merge(user_data, ori_ani_df, on="ani_id").sort_values(['score'], ascending=False)
    user_history = user_history.fillna(0)
    user_history = user_history .drop_duplicates()
    user_history['score'] = pd.to_numeric(user_history['score'], errors='coerce')
    user_history = user_history.sort_values(["score"], ascending=False)
    print("user_history\n", user_history)

    # 유저가 이미 본 애니 id를 뽑는다. (TF-IDF에 사용)
    user_history_list = user_history['ani_id'].values.tolist()
    
    # 유저가 이미 본 애니 series id를 뽑는다.
    user_history_series_list_all = user_history['series_id'].values.tolist()
    user_history_series_list = []
    for id in user_history_series_list_all:
        # 시리즈가 미리 추가되어 있지 않고 nan이 아니면 히스토리 시리즈 리스트에 추가
        if id not in user_history_series_list and np.isnan(id) == False:
            user_history_series_list.append(id)

    # 원본 애니 데이터에서 사용자가 본 애니 데이터를 제외한 데이터를 추출
    recommendations = ori_ani_df[~ori_ani_df['ani_id'].isin(user_history['ani_id'])]
    print("recommendations before: \n", recommendations, "\n")
    
    # 사용자의 애니 평점이 높은 순으로 정렬된 데이터와 위 recommendations을 합친다.
    recommendations = pd.merge(recommendations, pd.DataFrame(sorted_user_predictions).reset_index(), on='ani_id')
    print("recommendations after: \n", recommendations, "\n")
    
    # 컬럼 이름 바꾸고 정렬해서 return
    recommendation_list_all = list(recommendations.sort_values(userId, ascending=False)['ani_id'])

    # 추천 애니메이션 저장 리스트
    recommendation_list = []

    # 시리즈 저장 리스트
    series_list = user_history_series_list[:]

    for id in recommendation_list_all:

        # 선택한 애니메이션의 인덱스 가져옴
        idx = ani_df_id_to_idx[id]

        # 해당 인덱스의 시리즈 아이디 가져옴
        series = ani_df_idx_to_series[idx]

        # 시리즈가 미리 추가되어 있지 않다면 추천결과에 추가
        if series not in series_list:
            recommendation_list.append(id)
            # nan이 아니면 시리즈 리스트에 추가
            if np.isnan(series) == False:
                series_list.append(series)

        # 30개가 추천되면 종료
        if len(recommendation_list) == n:
            return user_history_list, recommendation_list
        

def recommend_ani_2(user_history_list, recommendation_list, n):
    print("TFIDF 시작")
    tf_idf_list = list()
    user_feat = ""
    for i in user_history_list:
        idx = feat_df_id_to_idx[i]
        feat = feat_df_idx_to_feat[idx]
        user_feat += feat
        user_feat += ' '
    tf_idf_list.append(user_feat)
    for j in recommendation_list:
        idx = feat_df_id_to_idx[j]
        reco_feat = feat_df_idx_to_feat[idx]
        tf_idf_list.append(reco_feat)

    tf_idf = TfidfVectorizer()
    tf_idf_matrix = tf_idf.fit_transform(tf_idf_list)
    cosine_sim = cosine_similarity(tf_idf_matrix, tf_idf_matrix)
    sim_scores = list(enumerate(cosine_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:(n+1)]

    id_list = list()
    for num in range(n):
        id_list.append(recommendation_list[sim_scores[num][0]-1])

    print("TFIDF 끝")
    return id_list


def get_user_data(user_id, ani_id, score):
    
    global rating_df, user_ani_ratings_df
    
    review = dbcol_review.find_one({"profile": user_id, "animation": ani_id})
    print(review)
    if review != None:
        print("score update")
        dbcol_review.update_one({"profile": user_id, "animation": ani_id}, {"$set": {"score": score}}, upsert=True)
    else:
        print("review insert")
        dbcol_review.insert_one({"profile": user_id, "animation": ani_id, "score": score})

    # rating_df에 데이터 추가
    rating_data = [[user_id, ani_id, score]]
    temp_col = ['user_id', 'ani_id', 'score']
    temp1 = pd.DataFrame(data=rating_data, columns=temp_col)
    rating_df = pd.concat([rating_df, temp1], ignore_index=True)
        
    # 리뷰를 처음 남기는 사람이라면 0으로 이뤄진 행 추가
    if user_id not in user_ani_ratings_df.index.astype(int):
        temp = [0 for i in range(len(user_ani_ratings_df.index))]
        temp2 = pd.DataFrame([temp], index=[user_id], columns=user_ani_ratings_df.columns)
        temp2.index.names = ["user_id"]
        user_ani_ratings_df = pd.concat([user_ani_ratings_df, temp2])

    # 0점을 score값으로 변경
    user_ani_ratings_df.loc[user_id, ani_id] = score

    # matrix는 pivot_table 값을 numpy matrix로 만든 것
    matrix = user_ani_ratings_df.values
    matrix = matrix.astype(float)

    # user_ratings_mean은 사용자의 평균 평점
    user_ratings_mean = np.mean(matrix, axis=1)

    # R_user_mean : 사용자-애니에 대해 사용자 평균 평점을 뺀 것.
    matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)

    # U 행렬, sigma 행렬, V 전치 행렬을 반환.
    U, sigma, Vt = svds(matrix_user_mean, k=12)

    # 위는 0이 아닌 값만 포함되었기에 0이 포함된 대칭행렬로 diag를 이용해 변환
    sigma = np.diag(sigma)

    # U, Sigma, Vt의 내적을 수행하면, 다시 원본 행렬로 복원이 된다.
    # 거기에 아까 평균을 빼었으니 다시 사용자 평균 rating 더한다.
    svd_user_predicted_ratings = np.dot(
        np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, index=user_ani_ratings_df.index, columns=user_ani_ratings_df.columns)
    
    input_user_id = user_id
    user_history_list, recommendation_list = recommend_ani(df_svd_preds, input_user_id, ani_df, rating_df, 28)

    # 최종 추천 애니 id 리스트
    id_list = recommend_ani_2(user_history_list, recommendation_list, 14)
    
    log = dbcol_log.find_one({"member_id": user_id})
    if log != None:
        print("related update")
        dbcol_log.update_one({"member_id": user_id}, {"$set": {"recommended": id_list}}, upsert=True)
    else:
        print("related insert")
        dbcol_log.insert_one({"member_id": user_id, "recommended": id_list})
        print("member_id: ", user_id)
        print("recommended: ", id_list)
    
    return id_list
