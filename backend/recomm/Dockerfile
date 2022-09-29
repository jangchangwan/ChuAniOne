FROM python:3.7

RUN apt-get update && pip install --upgrade pip

WORKDIR /app

ADD recomm/requirements.txt  /app/
RUN pip install -r requirements.txt