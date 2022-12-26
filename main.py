from flask import Flask, render_template,request,session, redirect,url_for,flash, send_from_directory
from flask import jsonify
from flask_socketio import SocketIO,emit,send
from json import dump
from flask_bootstrap import Bootstrap5
from urllib.parse import quote
import datetime as dt
import os
import time
from admFirebase import getQuestionsData as gqd,addUser, timeUser
from get_ip import getIpInfo
#from data import questions

#getting the data now
now = dt.datetime.now




app = Flask(__name__,static_url_path='/static')
'''the bootstrap init'''
bootstrap = Bootstrap5(app)

socketio = SocketIO(app)


'''init page'''

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    #emit('userInfo',userJson)
#    if request.MOBILE:
    userAgent = request.headers.get('User_Agent').lower()
    if 'android' in userAgent:
        print('it is mobile')
        return render_template('mobile.html',info='it is a device mobile')
    else:
        return render_template('index.html')


# @app.route('src/<path:path>')
# def sendPath(path):
#     return send_from_directory('static',path)

@app.route('/add_questions')
def quest():
    return render_template('questionsAdd.html')






'''the scoketio init'''


#sending the question
@socketio.on('get_question')
def get_question()-> None:
    print('sending questions')
    
    questions = gqd()

    emit('question',questions,json=True)

global users
users = {}
# connected
@socketio.on('connect')
def connect():
    userAgent = request.headers.get('User_Agent')
    ip = request.remote_addr
    date = now()
    dt_string = date.strftime("%d/%m/%Y %H:%M:%S")
    dt, hour = dt_string.split(' ')

    userJson = {"IP":ip,
                "userAgent":userAgent,
                "date":{"date":dt,"hour":hour},
                "acessList":[]}

   # addUser(userJson)
    global timeIp
    ip = request.remote_addr
    timeIp = {'ip':ip,'timeConnection':time.time()}
    users[ip]=timeIp
    emit('usersCount',len(users),broadcast=True)
    print(users)


def call(res):
    return res

#disconnected
@socketio.on('disconnect')
def disconnected():
    # print("Request:")
    # vars(request)
    # dir(request)
    # print("Session:")
    # vars(session)
    # dir(session)
    ip = request.remote_addr
    timeIp = users[ip]
    timeConnection = time.time() - timeIp['timeConnection']
    timeIp['timeConnection'] = timeConnection
    #timeUser(timeIp)
    print(f'o cara do ip {timeIp["ip"]} saiu, o cara ficou apenas {timeConnection:.2f}seg aqui') 
    del users[ip]
    emit('usersCount',len(users),broadcast=True)
    

#correction from question
@socketio.on('validateResponseQuestion')
def resGet(resUser,callback=call):
    questions = gqd()
    for question in questions:
        print('question:',question)
        if question['title'] == resUser['title']:
            isCorrect = (question['res']==resUser['res'])
            emit('correctionResponse',isCorrect)



if __name__ == '__main__':
	port = int(os.environ.get("PORT", 5000))
	socketio.run(app=app,host='0.0.0.0', port=port)
