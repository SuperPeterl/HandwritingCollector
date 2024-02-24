
from flask import Flask, request, render_template
import numpy as np
import os
import csv
import matplotlib.pyplot as plt



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
        temp.extend([[i['l'],i['x'],abs(i['y']-1600),text] for i in strokes_data[i]])

    temp = np.array()
    print(text+" : "+str(temp.shape))
    print(temp)
    np.save('strokes.npy',np.array(n.tolist()+temp.tolist()))
    with open('sentences.txt','a+',encoding="utf-8") as f:
        f.write(text+'\n')
    return 'Pen strokes data received and processed successfully'


if __name__ == '__main__':
    app.run(host='localhost', port=80, debug=True)