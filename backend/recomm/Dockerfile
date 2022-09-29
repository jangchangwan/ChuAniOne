FROM python:3.8

RUN apt-get update && pip install --upgrade pip

WORKDIR /app

RUN ls

ADD backend/recomm/requirements.txt  /app/
RUN pip install -r requirements.txt