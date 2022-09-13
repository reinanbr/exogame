from flask import Flask, render_template,request, redirect,url_for,flash, send_from_directory
from flask import jsonify
from flask_socketio import SocketIO,emit,send
from json import dump
from flask_bootstrap import Bootstrap5
from urllib.parse import quote
import datetime as dt
import os
from data import questions






now = dt.datetime.now
app = Flask(__name__,static_url_path='/static')

'''the bootstrap init'''
bootstrap = Bootstrap5(app)



@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


#app.add_url_rule('/favicon.ico',
#                 redirect_to=url_for('static', filename='favicon.ico'))

'''init page'''
@app.route('/')
def index():
    #data.current_user = current_user
    return render_template('index.html',data={'test':'ok'})




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