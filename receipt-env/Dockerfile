FROM python:3.10.12

COPY . /app
WORKDIR /app

RUN apt-get update
RUN apt-get install netcat-traditional
RUN python3 -m pip install -r requirements.txt

EXPOSE 8000
ENTRYPOINT ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "app:app"]