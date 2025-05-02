import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";

export default function NewUserRegistration() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!", [
        { text: "OK", onPress: () => console.log("Alerta fechado") },
      ]);
      return;
    }

    const novoUsuario = {
      username,
      senha,
    };

    try {
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!", [
          { text: "OK", onPress: () => console.log("Usuário cadastrado") },
        ]);
        setUsername("");
        setSenha("");
        setConfirmarSenha("");
      } else {
        const erro = await response.json();
        Alert.alert("Erro", erro.mensagem || "Falha ao cadastrar o usuário.", [
          { text: "OK", onPress: () => console.log("Erro ao cadastrar") },
        ]);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.", [
        {
          text: "OK",
          onPress: () =>
            console.log("Erro de conexão:", error, JSON.stringify(novoUsuario)),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallLogo}>PetFood</Text>
      <Text style={styles.label}>Faça seu Cadastro</Text>
      <TextInput
        style={styles.inputBig}
        placeholder=" e-mail"
        keyboardType="username-address"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputBig}
        placeholder=" senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.inputBig}
        placeholder=" confirme a senha"
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonInvis}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonInvisText}>
          Já tem uma conta? Faça login →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
