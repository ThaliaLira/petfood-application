# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ------------------- AUTH -------------------

@app.route("/auth/register", methods=["POST"])
def register():
    global data
    body = request.get_json()
    user_id = data.next_user_id
    data.next_user_id += 1

    data.users[user_id] = {
        "id": user_id,
        "email": body["email"],
        "password": body["password"], 
        "name": body.get("name", ""),
    }
    return jsonify({"message": "Usuário registrado!", "user_id": user_id})


@app.route("/auth/login", methods=["POST"])
def login():
    body = request.get_json()
    for user in data.users.values():
        if user["email"] == body["email"] and user["password"] == body["password"]:
            return jsonify({"message": "Login bem-sucedido", "user_id": user["id"]})
    return jsonify({"error": "Credenciais inválidas"}), 401

# ------------------- USUÁRIO -------------------

@app.route("/user/profile/<int:user_id>", methods=["GET", "PUT"])
def profile(user_id):
    if user_id not in data.users:
        return jsonify({"error": "Usuário não encontrado"}), 404
    if request.method == "GET":
        return jsonify(data.users[user_id])
    else:
        update = request.get_json()
        data.users[user_id].update(update)
        return jsonify({"message": "Perfil atualizado"})

@app.route("/user/delete/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    data.users.pop(user_id, None)
    return jsonify({"message": "Usuário deletado"})

# ------------------- PET -------------------

@app.route("/pets/<int:user_id>", methods=["GET", "POST"])
def user_pets(user_id):
    if request.method == "GET":
        return jsonify([pet for pet in data.pets.values() if pet["owner_id"] == user_id])
    else:
        body = request.get_json()
        pet_id = data.next_pet_id
        data.next_pet_id += 1
        data.pets[pet_id] = {
            "id": pet_id,
            "name": body["name"],
            "owner_id": user_id,
            "diseases": [],
            "preferences": []
        }
        return jsonify({"message": "Pet cadastrado", "pet_id": pet_id})

@app.route("/pets/<int:pet_id>", methods=["PUT", "DELETE"])
def update_pet(pet_id):
    if pet_id not in data.pets:
        return jsonify({"error": "Pet não encontrado"}), 404
    if request.method == "PUT":
        update = request.get_json()
        data.pets[pet_id].update(update)
        return jsonify({"message": "Pet atualizado"})
    else:
        data.pets.pop(pet_id)
        return jsonify({"message": "Pet deletado"})

@app.route("/pets/<int:pet_id>/diseases", methods=["PUT"])
def update_diseases(pet_id):
    if pet_id not in data.pets:
        return jsonify({"error": "Pet não encontrado"}), 404
    data.pets[pet_id]["diseases"] = request.get_json().get("diseases", [])
    return jsonify({"message": "Doenças atualizadas"})

@app.route("/pets/<int:pet_id>/preferences", methods=["PUT"])
def update_preferences(pet_id):
    if pet_id not in data.pets:
        return jsonify({"error": "Pet não encontrado"}), 404
    data.pets[pet_id]["preferences"] = request.get_json().get("preferences", [])
    return jsonify({"message": "Preferências atualizadas"})

# ------------------- ASSINATURA -------------------

@app.route("/subscription/<int:pet_id>", methods=["POST", "DELETE"])
def manage_subscription(pet_id):
    if request.method == "POST":
        data.subscriptions[pet_id] = {"pet_id": pet_id, "active": True}
        return jsonify({"message": "Assinatura criada"})
    else:
        data.subscriptions.pop(pet_id, None)
        return jsonify({"message": "Assinatura cancelada"})

# ------------------- WALLET -------------------

@app.route("/wallet/<int:user_id>", methods=["GET"])
def get_wallet(user_id):
    wallet = data.wallets.get(user_id)
    if not wallet:
        wallet = {
            "quantidade": 100,
            "cotacao": 0.9658,
            "valor_brl": round(100 * 0.9658, 2)
        }
        data.wallets[user_id] = wallet
    return jsonify(wallet)

# ------------------- MAIN -------------------

if __name__ == "__main__":
    app.run(debug=True)
