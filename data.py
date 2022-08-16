import json

with open('data/questions.json','r') as data:
    questions = json.load(data)
    print(questions)