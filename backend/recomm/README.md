# π Django μ€ν

## π·οΈ backend ν΄λ κ΅¬μ‘°

```shell
~backend
ββ.idea
ββchuanione
ββrecomm
ββvenv
β  .gitignore
ββ .gitkeep

```

## π·οΈ recomm ν΄λ κ΅¬μ‘°

```shell
~\backend\recomm
β  .env
β  Dockerfile
β  manage.py
β  README.md
β  requirements.txt
β
ββanimations
β  β  admin.py
β  β  apps.py
β  β  hybrid.py
β  β  models.py
β  β  serializers.py
β  β  tests.py
β  β  urls.py
β  β  views.py
β  β  __init__.py
β  β
β  ββmigrations
β     β  0001_initial.py
β     ββ __init__.py
β
ββdata
β
ββrecomm
    β  asgi.py
    β  settings.py
    β  urls.py
    β  wsgi.py
    ββ __init__.py
```

1. κ°μνκ²½ μ€μ  λ° μ€ν(μμΉ: ~backend)

```shell
# κ°μνκ²½ μμ±
python -m venv venv

# κ°μνκ²½ μ€ν (windows)
venv\Scripts\activate
```

2. ν¨ν€μ§ μ€μΉ

```shell
# ν¨ν€μ§ μ€μΉ
pip install -r recomm/requirements.txt

# ν¨ν€μ§ λ³κ²½ μ
pip freeze > recomm/requirements.txt
```

3. μ€ν(μμΉ: ~backend)

```shell
   python recomm/manage.py runserver
   python recomm/manage.py runserver [ν¬νΈλ²νΈ]
```
