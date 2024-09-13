import flask
import sqlite3
from flask import request, jsonify
from flask_cors import CORS
from flask import render_template
import hashlib, os

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api_port = int(os.getenv('API_PORT'))
hostname = os.getenv('API_HOSTNAME')

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', api_port=api_port, api_hostname=hostname)

@app.route('/1a51e157adec61466408206d2c8d95b0e9b6a6d0', methods=['GET'])
def home():
    return render_template('home.html', api_port=api_port, api_hostname=hostname)

@app.route('/api/v1/login/', methods=['GET'])
def login():
    username = request.args.get("username")
    password = request.args.get("password")
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if ("leo.borek@htlwildwest.at" in username):
        result = fetch_data_from_db('SELECT username, password FROM users WHERE username = "' + username + '" AND password = "' + hashed_password + '" ;')
    else:
        result = fetch_data_from_db('SELECT username, password FROM users WHERE username = ? AND password = ?', (username, hashed_password))
    if len(result) == 0:
        print("Login failed")
        return jsonify({'status': 'error', 'message': 'Invalid username or password'})
    else:
        print("Login successful")
        return jsonify({'status': 'success', 'message': 'Login successful'})
    
@app.route('/api/v1/homework/', methods=['GET'])
def search_homework():
    search_term = request.args.get("search_term")
    result = fetch_data_from_db('SELECT subject, description,due_date FROM homework WHERE subject LIKE "%' + search_term + '%"')
    return jsonify(result)

def fetch_data_from_db(query, params=None):
    conn = sqlite3.connect('user_db.sqlite')
    cur = conn.cursor()
    if params is None:
        cur.execute(query)
    else:
        cur.execute(query, params)
    rows = cur.fetchall()
    return rows


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6969)