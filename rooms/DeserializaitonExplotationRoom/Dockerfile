FROM python:3.10-slim

COPY . /app
WORKDIR /app

RUN pip3 install flask
RUN pip3 install flask_cors

COPY . .

RUN apt update -y && apt upgrade -y

RUN apt install -y ssh

RUN apt install netcat-openbsd -y

RUN service ssh start

EXPOSE 22

CMD ["python", "app.py"]

EXPOSE 6969
