# 📌 Django 실행

1. 가상환경 설정 및 실행(위치: ~backend)
```shell
# 가상환경 생성
python -m venv venv

# 가상환경 실행 (windows)
venv\Scripts\activate
```
2. 패키지 설치
```shell
# 패키지 설치
pip install -r requirements.txt

# 패키지 변경 시
pip freeze > requirements.txt
```
3. 실행(위치: ~backend/recomm)
```shell
   python manage.py runserver
   python manage.py runserver [포트번호]
```