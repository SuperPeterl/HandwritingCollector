
from flask import Flask, request, render_template
import numpy as np
import os
import csv
#import matplotlib.pyplot as plt
from pymongo import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://peter:iloverm@cluster0.q2xercf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


def testdb(uri):
    client = MongoClient(uri, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

def save(seq,text,uri):

    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client['RM']
    collection = db['thaiStrokeWithText']

    data = {
        "sequence": seq,
        "text": text
    }

    # Insert data into MongoDB
    collection.insert_one(data)

    # Close the connection
    client.close()
app = Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/collect_strokes', methods=['POST'])
def collect_strokes():
    if os.path.exists('strokes.npy'):
        n = np.load('strokes.npy')
    else:
        n = np.array([])
    temp = []
    data = request.get_json()
    text = data.get("text")
    #print(request)
    strokes_data = data.get('strokesData')
    for i in range(len(strokes_data)):
        print(i)
        temp.extend([[i['l'],i['x'],abs(i['y']-500)] for i in strokes_data[i]])
    save(seq=temp,text= text,uri= uri)
    temp = np.array(temp)
    
    print(text+" : "+str(temp.shape))
    print(temp)
    np.save('strokes.npy',np.array(n.tolist()+temp.tolist()))
    with open('sentences.txt','a+',encoding="utf-8") as f:
        f.write(text+'\n')
    
    #plt.plot(temp[:,1],temp[:,2],'r.')
    #plt.show()
    return 'Pen strokes data received and processed successfully'
if __name__ == '__main__':
    testdb(uri)
    app.run(host='0.0.0.0', port=3000, debug=True)