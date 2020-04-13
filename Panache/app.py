from flask import Flask, request, make_response, g
from flask_cors import CORS
import numpy as np
import pandas as pd
import csv

app = Flask(__name__)
CORS(app)

data = []


@app.route('/track_data', methods=['POST', 'GET'])
def hello_world():
    content = request.get_json()
    # result = variable klasifikacie, ktory sa musi returnovat, aby ho apka dostala
    # kod clasifikacie
    # return result
    result = '1'
    data.append(content)
    print(content)
    return result


# @app.route('/get_data', methods=['GET'])
# def get_data():
#     return ','.join([str(x) for x in data])
#

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
