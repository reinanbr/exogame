from flask import Flask, render_template,request, redirect,url_for,flash
from flask import jsonify
from flask_socketio import SocketIO,emit,send
from json import dump
from flask_bootstrap import Bootstrap5
from urllib.parse import quote
import datetime as dt








now = dt.datetime.now
app = Flask(__name__,static_url_path='/static')

'''the bootstrap init'''
bootstrap = Bootstrap5(app)



'''init page'''
@app.route('/')
def index():
    #data.current_user = current_user
    return render_template('index.html',data={'test':'ok'})






'''the scoketio init'''
socketio = SocketIO(app,async_mode=None)





if __name__ == '__main__':
    socketio.run(app,debug=True)