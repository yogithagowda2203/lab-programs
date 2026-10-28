from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = '62a08d7da4387e94a0df73f26dc94664'

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'bangalore')
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&APPID={API_KEY}'

    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "City not found or API error"}), 404

    data = response.json()
    formatted = {
        "city": data['name'],
        "temperature": data['main']['temp'],
        "feels_like": data['main']['feels_like'],
        "humidity": data['main']['humidity'],
        "description": data['weather'][0]['description'],
        "wind_speed": data['wind']['speed']
    }
    return jsonify(formatted)

if __name__ == '__main__':
    app.run(debug=True)