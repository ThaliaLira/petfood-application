from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="q1w2e3r4",
    database="petfood"
)
cursor = db.cursor(dictionary=True)


@app.route("/auth/register", methods=["POST"])
def register():
    body = request.get_json()
    email = body["email"]
    senha = body["password"]
    nome = body.get("name", "")
    
    cursor.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
    if cursor.fetchone():
        return jsonify({"error": "E-mail já cadastrado"}), 400

    cursor.execute(
        "INSERT INTO usuarios (email, senha, nome_completo) VALUES (%s, %s, %s)",
        (email, senha, nome)
    )
    db.commit()
    return jsonify({"message": "Usuário registrado!"})


@app.route("/auth/login", methods=["POST"])
def login():
    body = request.get_json()
    email = body["email"]
    senha = body["password"]

    cursor.execute(
        "SELECT id FROM usuarios WHERE email = %s AND senha = %s",
        (email, senha)
    )
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "Login bem-sucedido", "user_id": user["id"]})
    return jsonify({"error": "Credenciais inválidas"}), 401


@app.route("/user/profile/<int:user_id>", methods=["GET", "PUT"])
def profile(user_id):
    if request.method == "GET":
        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        return jsonify(user)
    else:
        update = request.get_json()

        endereco = update.pop('endereco', None)
        
        if endereco:
            for key in ['cep', 'rua', 'numero', 'complemento', 'cidade', 'estado']:
                if key in endereco:
                    update[key] = endereco[key]

        keys = ", ".join(f"{k} = %s" for k in update.keys())
        values = list(update.values()) + [user_id]
        
        cursor.execute(f"UPDATE usuarios SET {keys} WHERE id = %s", values)
        db.commit()

        return jsonify({"message": "Perfil atualizado"})


@app.route("/user/delete/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    cursor.execute("DELETE FROM usuarios WHERE id = %s", (user_id,))
    db.commit()
    return jsonify({"message": "Usuário deletado"})


@app.route("/pets/<int:user_id>", methods=["GET", "POST"])
def user_pets(user_id):
    if request.method == "GET":
        cursor.execute("SELECT * FROM pets WHERE usuario_id = %s", (user_id,))
        pets = cursor.fetchall()
        return jsonify(pets)
    else:
        body = request.get_json()
        cursor.execute(
            "INSERT INTO pets (usuario_id, nome, tipo, raca, data_nascimento, sexo, nivel_atividade) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (
                user_id,
                body["name"],
                body.get("tipo"),
                body.get("raca"),
                body.get("data_nascimento"),
                body.get("sexo"),
                body.get("nivel_atividade"),
            ),
        )
        db.commit()
        return jsonify({"message": "Pet cadastrado"})

@app.route("/pets/<int:pet_id>", methods=["PUT", "DELETE"])
def update_pet(pet_id):
    if request.method == "PUT":
        body = request.get_json()
        keys = ", ".join(f"{k} = %s" for k in body.keys())
        values = list(body.values()) + [pet_id]
        cursor.execute(f"UPDATE pets SET {keys} WHERE id = %s", values)
        db.commit()
        return jsonify({"message": "Pet atualizado"})
    else:
        cursor.execute("DELETE FROM pets WHERE id = %s", (pet_id,))
        db.commit()
        return jsonify({"message": "Pet deletado"})


@app.route("/subscription/<int:pet_id>", methods=["POST", "DELETE"])
def manage_subscription(pet_id):
    if request.method == "POST":
        body = request.get_json()
        cursor.execute(
            "INSERT INTO assinaturas (pet_id, preco_mensal, quantidade_racao_kg, data_assinatura, forma_pagamento, dados_pagamento, ativa) VALUES (%s, %s, %s, CURDATE(), %s, %s, TRUE)",
            (
                pet_id,
                body.get("preco_mensal"),
                body.get("quantidade_racao_kg"),
                body.get("forma_pagamento"),
                body.get("dados_pagamento"),
            ),
        )
        db.commit()
        return jsonify({"message": "Assinatura criada"})
    else:
        cursor.execute("DELETE FROM assinaturas WHERE pet_id = %s", (pet_id,))
        db.commit()
        return jsonify({"message": "Assinatura cancelada"})


@app.route("/wallet/<int:user_id>", methods=["GET"])
def get_wallet(user_id):
    cursor.execute("SELECT * FROM carteira_dogecoin WHERE usuario_id = %s", (user_id,))
    wallet = cursor.fetchone()
    if not wallet:
        quantidade = 100
        cotacao = 0.9658
        valor_brl = round(quantidade * cotacao, 2)
        cursor.execute(
            "INSERT INTO carteira_dogecoin (usuario_id, quantidade, cotacao, valor_em_reais) VALUES (%s, %s, %s, %s)",
            (user_id, quantidade, cotacao, valor_brl),
        )
        db.commit()
        wallet = {
            "usuario_id": user_id,
            "quantidade": quantidade,
            "cotacao": cotacao,
            "valor_em_reais": valor_brl,
        }
    return jsonify(wallet)


if __name__ == "__main__":
    app.run(debug=True)
