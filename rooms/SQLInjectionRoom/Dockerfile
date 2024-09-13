FROM python:3.10-slim

COPY . /app
WORKDIR /app

RUN pip3 install flask
RUN pip3 install flask_cors

COPY . .

RUN cd /app/js && python3 -m http.server 8000 &

CMD ["python", "api.py"]

EXPOSE 6969