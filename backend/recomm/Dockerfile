FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN apt-get update && pip install --upgrade pip
#추가한 부분
RUN mkdir /project
ADD . /project
#
# WORKDIR /app
WORKDIR /project

# COPY requirements.txt  ./
# COPY requirements.txt  /app/
RUN pip install -r requirements.txt

# COPY . .

EXPOSE 8000

# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "stock.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]