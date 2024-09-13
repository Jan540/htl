FROM python:3.10-slim

COPY . /app
WORKDIR /app

RUN pip3 install flask
RUN pip3 install flask_cors

COPY . .

EXPOSE 6969

CMD ["python", "api.py"]