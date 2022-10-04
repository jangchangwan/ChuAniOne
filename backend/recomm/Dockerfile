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

CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000","recomm.wsgi:application"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["python3", "manage.py", "runserver",  "0:8000"]

