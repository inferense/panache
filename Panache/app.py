from flask import Flask, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/track_data', methods=['POST', 'GET'])
def hello_world():
    content = request.json
    # result = variable klasifikacie, ktory sa musi returnovat, aby ho apka dostala
    # kod clasifikacie
    # return result
    result = '1'
    print(content)
    return result


if __name__ == '__main__':
    app.run()


