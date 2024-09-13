import flask
from flask import request, jsonify
from flask_cors import CORS
from flask import render_template
import subprocess, base64
import pickle, random, os

app = flask.Flask(__name__)

subjects_list = ['Mathematik', 'EN', 'INSY', 'NWT', 'SEW']

def generate_random_grades():
    return {subject: round(random.uniform(1, 5),1) for subject in subjects_list}

students_database = {
    'Anna Schmidt': {'grades': generate_random_grades()},
    'Pupsi Huber': {'grades': generate_random_grades()},
    'Ahmed Bieber': {'grades': generate_random_grades()},
}

with open('serialized_data.pkl', 'wb') as file:
    pickle.dump(students_database, file)

@app.route('/')
def index():
    with open('serialized_data.pkl', 'rb') as file:
        data = file.read()
        students_database = pickle.loads(data)
    return render_template('index.html', students=students_database, subjects=subjects_list)

@app.route('/add_grade', methods=['POST'])
def add_grade():
    try:
        student = base64.b64decode(request.form.get('student')).decode('utf-8')
        subject = request.form.get('subject')
        grade = float(request.form.get('grade'))
        
        if student not in students_database:
            students_database[student] = {'grades': {}}
        
        students_database[student]['grades'][subject] = grade
        with open('serialized_data.pkl', 'wb') as file:
            pickle.dump(students_database, file)
    except:
        student = base64.b64decode(request.form.get('student'))
        subject = request.form.get('subject')
        grade = float(request.form.get('grade'))  
        
        with open('serialized_data.pkl', 'wb') as file:
            file.write(student)
         
    return render_template('index.html', students=students_database, subjects=subjects_list, success_message=f"Grade added for {student} in {subject}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6969)
