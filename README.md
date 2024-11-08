# infobazaar

## Como usar esse repositório

Faça o donwload do repositório e uso o arquivo `docker-compose.yml` para
executar os desafios em uma instância do docker. Você pode também fazer a instalação dos
desafios manualmente usando as referências no fim deste arquivo.

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
