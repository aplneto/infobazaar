FROM node:22-alpine

ADD ./frontend/ /home/frontend/

WORKDIR /home/frontend/

RUN npm instal --save axios
RUN npm install typescript -g
RUN npm run build

FROM python:3.10.12

RUN apt update
RUN apt install default-libmysqlclient-dev build-essential pkg-config -y

ENV EMAIL_HOST_USER="noreply@infobazaar.store"
ENV EMAIL_HOST_PASSWORD=""

ENV SECRET_KEY="Emmanuel's Mosley's reallocates camomile hintedX"

ENV DJANGO_SUPERUSER_USERNAME="admin"
ENV DJANGO_SUPERUSER_PASSWORD="fbf56f61c36e54003a9ef147a02a2367eec0b696f61dd940bb6d7e256cf6c96e"
ENV DJANGO_SUPERUSER_EMAIL=""

ENV ALLOWED_HOSTS='infobazaar.store, localhost, 127.0.0.1'

ENV DJANGO_DB_NAME="infobazaarappdb"
ENV DJANGO_DB_USER="infobazaaradmin"
ENV DJANGO_DB_PASSWORD=""
ENV DJANGO_DB_HOST=""
ENV DJANGO_DB_PORT="3306"

ADD . /home/infobazaar/
COPY --from=0 /home/frontend/ /home/frontend
WORKDIR /home/infobazaar/
RUN mkdir /home/infobazaar/static/
RUN mkdir -p /home/infobazaar/media/project_files/

RUN python3 -m pip install -r requirements.txt
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
# RUN python3 manage.py populate
# RUN python3 manage.py generate_project_files
# RUN python3 manage.py import_images # ---> This step is optional, it adds the profile pictures of the users to them
RUN python3 manage.py collectstatic --no-input
RUN python3 manage.py createsuperuser --no-input

EXPOSE 8666
ENTRYPOINT [ "gunicorn", "--workers", "16", "--bind", "0.0.0.0:8666", "infobazaar.wsgi:application" ]
# ENTRYPOINT [ "python3", "manage.py", "runserver", "0.0.0.0:80" ]