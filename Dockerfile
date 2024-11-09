FROM node:22-alpine

ADD ./frontend/ /home/frontend/

WORKDIR /home/frontend/

RUN npm instal --save axios
RUN npm install typescript -g
RUN npm run build

FROM python:3.10.12

ENV REACT_APP_URL infobazaar.local
ENV DJANGO_SUPERUSER_USERNAME admin
ENV DJANGO_SUPERUSER_PASSWORD "trad hull town vent bart wish"
ENV DJANGO_SUPERUSER_EMAIL admin@infobazaar.store
ENV EMAIL_HOST_USER "noreply@$REACT_APP_URL"
ENV EMAIL_HOST_PASSWORD ""
ENV EMAIL_PORT 1025
ENV EMAIL_HOST smtp-server
ENV SECRET_KEY "Vela Changchun's moves geckos remitted"

RUN apt update
RUN apt install default-libmysqlclient-dev build-essential pkg-config -y

ADD . /home/infobazaar/
COPY --from=0 /home/frontend/ /home/infobazaar/frontend
WORKDIR /home/infobazaar/
RUN mkdir /home/infobazaar/static/
RUN mkdir -p /home/infobazaar/media/project_files/
RUN python3 -m pip install -r requirements.txt

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 manage.py populate
RUN python3 manage.py generate_project_files
RUN python3 manage.py import_pictures
RUN python3 manage.py collectstatic --no-input
RUN python3 manage.py createsuperuser --no-input

EXPOSE 8666

ENTRYPOINT [ "gunicorn", "--workers", "3", "--bind", "0.0.0.0:8666", "infobazaar.wsgi:application" ]
