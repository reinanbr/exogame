
import firebase_admin
from firebase_admin import credentials,firestore
import datetime
import time
# from firebase_admin import db
import json


cred = credentials.Certificate("exodatat-firebase-adminsdk-ac4zq-6f38939310.json")
app = firebase_admin.initialize_app(cred)


db = firestore.client()


# add questions
def addQuestions(jsonQuestion):
    try:
        questionsDb = db.collection('questions')

        # food_json = {
        #     "body":bod,
        #     "like":0,
        #     "dislike":0,
        #     "date_update":str(datetime.datetime.now()),
        #     "time_update":time.time(),
        #     "usersLikeList":[],
        #     "usersDislikeList":[]
        # }
        questionsDb.document(jsonQuestion['name']).set(jsonQuestion)
        return True,jsonQuestion
    except:
        return False


#Users
def addUser(userJson):
    userData = db.collection('users')
    userDataList = userData.stream()
    userExist = False
    for userInfo in userDataList:
        userInfo = userInfo.to_dict()

        if userJson['IP'] == userInfo['IP']:
            userExist = userInfo

    if 'acessList' in userExist:
        userExist['acessList'].append(userJson['date'])
        userExist['date']=userJson['date']
        userData.document(userExist['IP']).set(userExist)

    else:
        userData.document(userJson['IP']).set(userJson)



#adding time connection
def timeUser(timeIp):
    ip,timeConnection = timeIp['ip'],timeIp['timeConnection']
    usersData = db.collection('users')
    usersDataList = usersData.stream()

    for userInfo in usersDataList:
        userInfo = userInfo.to_dict()
        print(userInfo)
        if userInfo['IP']==ip:
            print('achei')
            print(userInfo['date'])
            userInfo['date']['timeConnection'] = timeConnection
            userInfo['acessList'][-1]=userInfo['date']
            print(userInfo)
            usersData.document(userInfo['IP']).set(userInfo)


def getQuestionsData():
    questionsDb = db.collection('questions')
    questionsDb = questionsDb.stream()
    questionsList = []
    for question in questionsDb:
        question = question.to_dict()
        questionsList.append(question)
    print('questions:',questionsList)
    return questionsList

# # read food
# def get_food_day():

#     foods = db.collection('foods')
#     get_foods = foods.stream()
#     foods_list = []

#     for fds in get_foods:
#         fds = fds.to_dict()
#         foods_list.append(fds)


#     food_day = foods_list[0]
#     for fd in foods_list:
#         if fd['time_update']>food_day['time_update']:
#             food_day = fd
#         # else:
#         #     food_day = fds

#     return food_day


# #function for like
# def like(food,user):
#     #food['like'] = food['like']+1
#     user_key = user['userKey']
#     if not (user_key in food['usersLikeList']):
#         food['usersLikeList'].append(user_key)
#     else:
#         pass
    
#     if user_key in food['usersDislikeList']:
#         food['usersDislikeList'].remove(user_key)
        
#     food['like'] = len(food['usersLikeList']) - 1 if len(food['usersLikeList'])>0 else 0

#     food['dislike'] = len(food['usersDislikeList']) - 1 if len(food['usersDislikeList'])>0 else 0

#     foods = db.collection('foods')
#     foods.document(food['name']).set(food)



# #function for dislike
# def dislike(food,user):
#     user_key = user['userKey']
#     if not (user_key in food['usersDislikeList']):
#         food['usersDislikeList'].append(user_key)
#     else:
#         pass
    
#     if user_key in food['usersLikeList']:
#         food['usersLikeList'].remove(user_key)
        
#     food['like'] = len(food['usersLikeList']) - 1 if len(food['usersLikeList'])>0 else 0

#     food['dislike'] = len(food['usersDislikeList']) - 1 if len(food['usersDislikeList'])>0 else 0

#     foods = db.collection('foods')
#     foods.document(food['name']).set(food)



# # #read
# # data = db.collection('users').stream()

# # for user in data:
# #     usr = user.to_dict()
# #     print(usr)
# # # users = db.collection('users')

# # # users.document('user1').set(
# #     {"ip":"127.0.0.1",
# #      "UserAgent":"linux",
# #      "date":"N"}
# #     )