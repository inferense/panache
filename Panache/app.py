from flask import Flask, request, make_response, g
from flask_cors import CORS
from static import DP
import numpy as np
import pandas as pd
import pickle


app = Flask(__name__)
CORS(app)

data = []

with open('./clf.pickle', 'rb') as f:
    model = pickle.load(f)


def clfout(sample):
    sample = sample.reshape(1, -1)
    if model.decision_function(sample) <= (-1.5):
        return "1"
    elif model.decision_function(sample) >= 1.0:
        return "2"
    else:
        return "0"


@app.route('/track_data', methods=['POST', 'GET'])
def hello_world():
    content = request.get_json()
    df = pd.DataFrame(np.array(content), columns=['x', 'y', 'z'])
    # data.append(content)

    test = DP.Process(df)
    test.frames()
    test.FFT()
    features = test.feed()
    result = clfout(features)
    print(result)
    return result


@app.route('/get_data', methods=['GET'])
def get_data():
    CSV = 'x,y,z\n'
    for batch in data:
        for row in batch:
            CSV += f'{row[0]},{row[1]},{row[2]}\n'

    response = make_response(CSV)
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"
    response.headers["Content-type"] = "text/csv"

    return response


if __name__ == '__main__':
    app.run()
