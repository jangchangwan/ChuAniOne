FROM python:3.8

RUN apt-get update && pip install --upgrade pip

WORKDIR /app

ADD requirements.txt  /app/
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "stock.wsgi:application"]