from flask import Flask, render_template,request, redirect,url_for,flash, send_from_directory
from flask import jsonify
from flask_socketio import SocketIO,emit,send
from json import dump
from flask_bootstrap import Bootstrap5
from urllib.parse import quote
import datetime as dt
import os
from admFirebase import getQuestionsData as gqd,addUser
#from data import questions

questions = gqd()

#getting the data now
now = dt.datetime.now




app = Flask(__name__,static_url_path='/static')
'''the bootstrap init'''
bootstrap = Bootstrap5(app)




'''init page'''

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    userAgent = request.headers.get('User_Agent')
    ip = request.remote_addr
    date = now()
    dt_string = date.strftime("%d/%m/%Y %H:%M:%S")
    userJson = {"IP":ip,
                "userAgent":userAgent,
                "date":dt_string,
                "acessList":[]}
    addUser(userJson)
    return render_template('index.html',data={'test':'ok'})



@app.route('/add_questions')
def quest():
    return render_template('questionsAdd.html')






'''the scoketio init'''
socketio = SocketIO(app,async_mode=None)

#sending the question
@socketio.on('get_question')
def get_question()-> None:
    print('sending questions')
    emit('question',questions,json=True)

# connected
@socketio.on('connected')
def connect(data):
    print(data)

#disconnected
@socketio.on('disconnect')
def disconnected(data_):
    print(data_)






if __name__ == '__main__':
	port = int(os.environ.get("PORT", 5000))
	socketio.run(app=app,host='0.0.0.0', port=port)