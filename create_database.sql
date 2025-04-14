CREATE DATABASE IF NOT EXISTS petfood;
USE petfood;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    cep VARCHAR(10),
    rua VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2)
);

CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('cão', 'gato') NOT NULL,
    raca VARCHAR(100),
    data_nascimento DATE,
    sexo ENUM('macho', 'fêmea'),
    nivel_atividade ENUM('baixo', 'médio', 'alto'),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS doencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS pet_doencas (
    pet_id INT,
    doenca_id INT,
    PRIMARY KEY (pet_id, doenca_id),
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    FOREIGN KEY (doenca_id) REFERENCES doencas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS preferencias_alergias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS pet_preferencias (
    pet_id INT,
    preferencia_id INT,
    PRIMARY KEY (pet_id, preferencia_id),
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    FOREIGN KEY (preferencia_id) REFERENCES preferencias_alergias(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assinaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    preco_mensal DECIMAL(10,2),
    quantidade_racao_kg DECIMAL(5,2),
    data_assinatura DATE,
    forma_pagamento ENUM('cartão de crédito', 'bitcoin'),
    dados_pagamento TEXT,
    ativa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carteira_dogecoin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    quantidade DECIMAL(10,4),
    cotacao DECIMAL(10,4),
    valor_em_reais DECIMAL(10,2),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

