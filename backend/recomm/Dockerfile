# gunicorn 시도

FROM python:3.8

RUN apt-get update && pip install --upgrade pip

WORKDIR /app

# WORKDIR /usr/src/app
# RUN mkdir /project
# ADD . /project
# WORKDIR /project

# COPY requirements.txt  ./
# COPY requirements.txt  /app/

COPY . /app/

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000","--log-level=debug","recomm.wsgi:application", "-t 120"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["python3", "manage.py", "runserver",  "0:8000"]

#uwsgi 시도
# FROM python:3.8

# ENV PYTHONUNBUFFERED 1

# RUN apt-get -y update
# RUN apt-get -y install vim #docker 안에서 vim설치를 안하도록

# RUN mkdir /srv/docker-server
# ADD . /srv/docker-server

# WORKDIR /srv/docker-server

# RUN pip install --upgrade pip #pip 업그레이드
# RUN pip install uwsgi
# RUN pip install -r requirements.txt #필수 패키지 설치

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]