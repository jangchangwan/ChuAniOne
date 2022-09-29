FROM python:3.7-alpine

RUN apt-get update

WORKDIR /app

ADD recomm/requirements.txt  /app/
RUN pip install -r requirements.txt