FROM node:22-alpine

ADD ./frontend/ /home/frontend/

WORKDIR /home/frontend/

RUN npm instal --save axios
RUN npm install typescript -g
RUN npm run build

FROM python:3.10.12

ARG SECRE_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_STORAGE_BUCKET_NAME
ARG AWS_S3_ENDPOINT_URL
ARG AWS_S3_REGION_NAME

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
# RUN python3 manage.py populate
# RUN python3 manage.py generate_project_files
# RUN python3 manage.py import_images # ---> This step is optional, it adds the profile pictures of the users to them
RUN python3 manage.py collectstatic --no-input
RUN python3 manage.py createsuperuser --no-input

EXPOSE 8666
ENTRYPOINT [ "gunicorn", "--workers", "16", "--bind", "0.0.0.0:8666", "infobazaar.wsgi:application" ]
# ENTRYPOINT [ "python3", "manage.py", "runserver", "0.0.0.0:80" ]