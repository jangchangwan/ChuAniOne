FROM python:3.8

RUN apt-get update && pip install --upgrade pip

WORKDIR /app
# WORKDIR /project

# COPY requirements.txt  ./
# COPY requirements.txt  /app/
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# EXPOSE 8000

# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "stock.wsgi:application"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]