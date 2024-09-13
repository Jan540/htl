import flask
from flask import request, jsonify
from flask_cors import CORS
from flask import render_template
import subprocess, base64, os

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api_port = int(os.getenv('API_PORT'))
hostname = os.getenv('API_HOSTNAME')

@app.route('/')
def index():
    return render_template('index.html', api_port=api_port, api_hostname=hostname)

@app.route('/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', methods=['GET'])
def command():
    return render_template('command.html', api_port=api_port, api_hostname=hostname)

@app.route('/api/v1/login/', methods=['GET'])
def login():
    username = request.args.get("username")
    password = request.args.get("password")
    if ("leo.borek@htlwildwest.at" == username and "password!" == password):
        return jsonify({'status': 'success', 'message': 'Login successful'})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid username or password'})

@app.route("/api/v1/ping", methods=['GET'])
def ping_ip():
    ip = request.args.get("ip")
    count = request.args.get("count")
    command = "ping -c " + count + " " + ip
    res = subprocess.run(command, capture_output=True, shell=True)
    out = res.stdout
    return jsonify({'status': 'success', 'output': base64.b64encode(out).decode('utf-8')})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6969)