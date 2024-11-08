# infobazaar

## Flags

- TAC{welcome-to-the-jungle:5434ff051aa72bf58a998aded8b5a0b8c6df8ae1493c245dc0aeadcc124fb53a}
- TAC{psycho-killer-c-est-que-ce:ec8d207507650c8c9c4cac17ddb1f4b424dfef6b6ab9b20449cf7a0d5d13a416}
- TAC{somebody-s-watching-me:cbefc39013cc57b03712e0b4bdd2029d04a7d9bbb1d0d31f16664bc920b37f2c}
- TAC{unholy:cbfb10d180bb1ce4334d1f1c69ce119a70658ba0ac5f0b9c381103b2a2e24be1}
- TAC{baby-you-re-a-rich-man:8438bc689a96c8da258b19ac8f8daf823e6cb72a63732f3f68a12a825884bd60}

- TAC{left-behind:22603b74c263bb249d22b1620a4f2d7c6a92900835749de21fd4ff29ed5e19d8}
- TAC{gj:1b7ae9e240dc2ada761761745eca2c43471220bc36569fc12f881ca0cbcad208}
- TAC{help-is-on-the-way:063c3a20c004fea3108933d2617b64810f47293c786a9202df2714841569740e}

## Como usar esse repositório

Para fazer a instalação local, baixe esse repositório usando o Git for Windows, o comando
`git clone` ou através do ZIP e extraia seu conteúdo. Em seguida acesse o diretório do repositório
e instale as dependências manualmente ou através do comando `pip install -r requirements.txt`.

Note que talvez seja preciso a instalação dos seguintes pacotes:

- NodeJS
- MySQL

No entanto, recomendo que utilize o arquivo docker-compose.yml

### .env Example

```
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
SECRET_KEY=
DJANGO_SUPERUSER_USERNAME=
DJANGO_SUPERUSER_PASSWORD=
DJANGO_SUPERUSER_EMAIL=
ALLOWED_HOSTS=
DJANGO_DB_NAME=
DJANGO_DB_USER=
DJANGO_DB_PASSWORD=
DJANGO_DB_HOST=
DJANGO_DB_PORT=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=
AWS_S3_ENDPOINT_URL=
AWS_S3_REGION_NAME=
```

## Nginx

```
server {
    listen 80

    location /static {
        alias /var/www/html/static;
    }

    location /media {
        alias /var/www/html/media;
    }

    location /receipt {
        proxy_pass http://127.0.0.1:8000;
    }

    location / {
        proxy_pass  http://127.0.0.1:8666;
        include     /etc/nginx/proxy_params;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## MinIO command

## Referências

- https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/gunicorn/
- https://docs.djangoproject.com/en/5.1/ref/databases/
- https://min.io/docs/minio/container/index.html
