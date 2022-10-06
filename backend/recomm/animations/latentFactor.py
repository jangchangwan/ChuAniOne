from glob import glob
import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.metrics.pairwise import cosine_similarity


def matrix_factorization(R, K, steps, learning_rate, r_lambda):
    print(">>>>>>>>>>>>>>>>>>> matrix_factorization")
    num_users, num_items = R.shape
    # P와 Q 매트릭스의 크기를 지정하고 정규분포를 가진 랜덤한 값으로 입력합니다. 
    np.random.seed(1)
    P = np.random.normal(scale=1./K, size=(num_users, K))
    Q = np.random.normal(scale=1./K, size=(num_items, K))

    break_count = 0

    # R > 0 인 행 위치, 열 위치, 값을 non_zeros 리스트 객체에 저장. 
    non_zeros = [ (i, j, R[i,j]) for i in range(num_users) for j in range(num_items) if R[i,j] > 0 ]

    # SGD기법으로 P와 Q 매트릭스를 계속 업데이트. 
    for step in range(steps):
        for i, j, r in non_zeros:
            # 실제 값과 예측 값의 차이인 오류 값 구함
            eij = r - np.dot(P[i, :], Q[j, :].T)
            # Regularization을 반영한 SGD 업데이트 공식 적용
            P[i,:] = P[i,:] + learning_rate*(eij * Q[j, :] - r_lambda*P[i,:])
            Q[j,:] = Q[j,:] + learning_rate*(eij * P[i, :] - r_lambda*Q[j,:])

        rmse = get_rmse(R, P, Q, non_zeros)
        if (step % 10) == 0 :
            print("### iteration step : ", step," rmse : ", rmse)
            
    return P, Q


# 실제 행렬과 예측 행렬의 차이를 구하는 함수
def get_rmse(R, P, Q, non_zeros):
    print(">>>>>>>>>>>>>>>>>>> get_rmse")
    error = 0
    # 두개의 분해된 행렬 P와 Q.T의 내적으로 예측 R 행렬 생성
    full_pred_matrix = np.dot(P, Q.T)
    
    # 실제 R 행렬에서 널이 아닌 값의 위치 인덱스 추출하여 실제 R 행렬과 예측 행렬의 RMSE 추출
    x_non_zero_ind = [non_zero[0] for non_zero in non_zeros] # 행
    y_non_zero_ind = [non_zero[1] for non_zero in non_zeros] # 열
    R_non_zeros = R[x_non_zero_ind, y_non_zero_ind]           # 실제 값
    full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind]
    mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
    rmse = np.sqrt(mse)
    
    return rmse


# 사용자가 평점을 부여한 도서에 대해서만 예측 성능 평가 MSE를 구한다.
def get_mse(pred, actual):
    print(">>>>>>>>>>>>>>>>>>> get_mse")
    # 평점이 있는 애니만 추출
    pred = pred[actual.nonzero()].flatten()
    actual = actual[actual.nonzero()].flatten()
    return mean_squared_error(pred, actual)

# 예측 평점 계산식 함수 구현
def predict_rating(ratings_arr, ani_sim_arr):
    print(">>>>>>>>>>>>>>>>>>> predict_rating")
    # dot : 내적을 이용한 가중합 계산
    ratings_pred = ratings_arr.dot(ani_sim_arr) / np.array([np.abs(ani_sim_arr).sum(axis=1)])
    return ratings_pred

# 가장 비슷한 유사도를 가지는 애니에 대해서만 유사도 벡터를 적용하 예측 평점 계산식 함수
def predict_rating_topsim(ratings_arr, ani_sim_arr, n):
    print(">>>>>>>>>>>>>>>>>>> predict_rating_topsim")
    # 사용자-아이템 평점 행렬 크기만큼 0으로 채운 예측 행렬 초기화
    pred = np.zeros(ratings_arr.shape)
    
    # 사용자-아이템 평점 행렬의 열 크기만큼 루프 수행.
    for col in range(ratings_arr.shape[1]):
        
        # 유사도 행렬에서 유사도가 큰 순으로 n개 데이터 행렬의 인덱스 반환
        top_n_items = [np.argsort(ani_sim_arr[:, col])[:-n-1:-1]]
        
        # 개인화된 예측 평점을 계산
        for row in range(ratings_arr.shape[0]):
            pred[row, col] = ani_sim_arr[col, :][top_n_items].dot(ratings_arr[row, :][top_n_items].T)
            pred[row, col] /= np.sum(np.abs(ani_sim_arr[col, :][top_n_items]))
            
    return pred


def get_unseen_ani(ratings_mat, user_id):
    print(">>>>>>>>>>>>>>>>>>> get_unseen_ani")
    # userId로 입력받은 사용자의 모든 영화정보 추출하여 Series로 반환함. 
    # 반환된 user_rating 은 영화명(title)을 index로 가지는 Series 객체임. 
    user_rating = ratings_mat.loc[user_id,:]
    
    # user_rating이 0보다 크면 기존에 관람한 영화임. 대상 index를 추출하여 list 객체로 만듬
    already_seen = user_rating[ user_rating > 0].index.tolist()
    
    # 모든 애니 이름을 list 객체로 만듬. 
    ani_list = ratings_mat.columns.tolist()
    
    # list comprehension으로 already_seen에 해당하는 movie는 movies_list에서 제외함. 
    unseen_list = [ ani for ani in ani_list if ani not in already_seen]
    
    return unseen_list


def recomm_ani_by_user_id(pred_df, user_id, unseen_list, top_n):
    print(">>>>>>>>>>>>>>>>>>> recomm_ani_by_user_id")
    # 예측 평점 DataFrame에서 사용자id index와 unseen_list로 들어온 애니 이름 컬럼을 추출하여
    # 가장 예측 평점이 높은 순으로 정렬함. 
    recomm_ani = pred_df.loc[user_id, unseen_list].sort_values(ascending=False)[:top_n]
    return recomm_ani


def start_recomm(user_id):
    print(">>>>>>>>>>>>>>>>>>> start_recomm")
    user_rating_id = ani_ratings_mat.loc[user_id,:]
    user_rating_id = user_rating_id[user_rating_id > 0 ].sort_values(ascending=False)
    
    # global ratings_pred_mat
    
    # 사용자가 관람하지 않은 애니
    unseen_list = get_unseen_ani(ani_ratings_mat, user_id)

    # 아이템 기반의 인접 이웃 협업 필터링으로 영화 추천
    recomm_ani = recomm_ani_by_user_id(ratings_pred_mat, user_id, unseen_list, top_n=14)

    # 평점 데이터를 DataFrame으로 생성
    recomm_ani_df = pd.DataFrame(data=recomm_ani.values, index=recomm_ani.index, columns=["pred_score"])
    return recomm_ani_df


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
dbcol_feat = db.ani_feature
dbcol_log = db.ani_log


ratings = pd.DataFrame(dbcol_review.find({}, {"_id": 0}))
ratings = ratings[["profile", "animation", "score"]]

animations_df = pd.DataFrame(dbcol_info.find({}, {"_id": 0}))
animations_df = animations_df[["id", "name", "series_id"]]

ani_ratings = pd.merge(ratings, animations_df, left_on="animation", right_on="id")
ani_ratings.rename(columns={"profile": "user_id", "animation": "ani_id"}, inplace=True)
ani_ratings = ani_ratings[["user_id", "ani_id", "score", "name"]]
ani_ratings_mat = ani_ratings.pivot_table("score", index="user_id", columns="ani_id")
ani_ratings_mat = ani_ratings_mat.fillna(0)
ani_ratings_mat_T = ani_ratings_mat.transpose()

ani_sim = cosine_similarity(ani_ratings_mat_T, ani_ratings_mat_T)

# cosine_similarity()로 반환된 Numpy행렬을 애니메이션 제목으로 매핑해 DataFrame으로 변환
ani_sim_df = pd.DataFrame(ani_sim, index=ani_ratings_mat.columns, columns=ani_ratings_mat.columns)


ratings_pred = predict_rating(ani_ratings_mat.values, ani_sim_df.values)
ratings_pred_mat = pd.DataFrame(ratings_pred, index=ani_ratings_mat.index, columns = ani_ratings_mat.columns)
print('MSE : ', get_mse(ratings_pred, ani_ratings_mat.values ))

ratings_pred = predict_rating_topsim(ani_ratings_mat.values, ani_sim_df.values, n=14)
print('아이템 기반 최근접 Top-14 이웃 MSE : ', get_mse(ratings_pred, ani_ratings_mat.values))

# 계산된 예측 평점 데이터를 DataFrame으로 변경
ratings_pred_mat = pd.DataFrame(data=ratings_pred, index=ani_ratings_mat.index,columns=ani_ratings_mat.columns)




# # 애니 제목 컬럼으로 pivot 수행. 
# ratings_mat = ani_ratings.pivot_table("score", index="user_id", columns="ani_id")

# P, Q = matrix_factorization(ratings_mat.values, K=50, steps=1, learning_rate=0.01, r_lambda = 0.01)
# pred_mat = np.dot(P, Q.T)
# ratings_pred_mat = pd.DataFrame(data=pred_mat, index= ratings_mat.index, columns = ratings_mat.columns)

start_recomm(2976649)