import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa o hook de navegação
import styles from "./Styles";

export default function Login() {
  const navigation = useNavigation(); // Cria a instância de navegação

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!username || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          senha: senha,
        }),
      });

      const responseText = await response.text();
      console.log("Resposta da API:", responseText);

      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error(
          "Erro ao tentar parsear a resposta como JSON:",
          jsonError
        );
        Alert.alert("Erro", "A resposta da API não é um JSON válido.");
        return;
      }

      if (response.status === 200) {
        Alert.alert("Sucesso", "Login bem-sucedido!");
        navigation.navigate("UserProfile", { username });
      } else {
        Alert.alert("Erro", data.erro || "Erro ao tentar fazer login.");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      Alert.alert("Erro", "Houve um erro ao tentar se conectar ao servidor.");
    }
  };

  return (
    <View style={styles.containerLogin}>
      <Text style={styles.bigLogo}>PetFood</Text>

      <TextInput
        style={styles.inputBig}
        placeholder=" e-mail"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputBig}
        placeholder=" senha"
        value={senha}
        onChangeText={setSenha}
        type="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonInvis}>
        <Text style={styles.buttonInvisText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewUserRegistration")}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
