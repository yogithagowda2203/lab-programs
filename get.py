from flask import Flask, jsonify, request

app = Flask(__name__)
users = [
    {"id": 1, "name": "aziya", "course": "bca"},
    {"id": 2, "name": "raghavi", "course": "bba"},
    {"id": 3, "name": "preethi", "course": "bcom"},
]

@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)

@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    for user in users:
        if user["id"] == user_id:
            return jsonify(user)

    return jsonify({"message": "user not found"})

if __name__ == "__main__":
    app.run(debug=True)