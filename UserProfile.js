import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles";
import { useNavigation, useRoute } from "@react-navigation/native";

const UserProfile = () => {
  const route = useRoute();
  const { username } = route.params;
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleExcluir = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://localhost:8081/perfil?username=${username}`,
                {
                  method: "DELETE",
                }
              );

              if (!response.ok) {
                const errorMessage = `Erro ${response.status}: ${response.statusText}`;
                Alert.alert("Erro", errorMessage, [{ text: "OK" }]);
                return;
              }

              Alert.alert("Sucesso", "Perfil excluído com sucesso!", [
                { text: "OK", onPress: () => navigation.navigate("Login") },
              ]);
            } catch (error) {
              console.error("Erro de conexão:", error);
              Alert.alert(
                "Erro",
                `Erro ao conectar ao servidor: ${error.message}`,
                [{ text: "OK" }]
              );
            }
          },
        },
      ]
    );
  };

  const carregarDadosPerfil = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/perfil?username=${username}`
      );
      if (!response.ok) {
        throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
      }

      const dados = await response.json();
      setNome(dados.nome || "");
      setEmail(dados.email || "");
      setCpf(dados.cpf || "");
      setTelefone(dados.telefone || "");
      setCep(dados.endereco?.cep || "");
      setRua(dados.endereco?.rua || "");
      setNumero(dados.endereco?.numero || "");
      setComplemento(dados.endereco?.complemento || "");
      setCidade(dados.endereco?.cidade || "");
      setEstado(dados.endereco?.estado || "");

      verificarDadosFaltantes(dados);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", `Erro ao carregar os dados: ${error.message}`, [
        { text: "OK" },
      ]);
    }
  };

  const verificarDadosFaltantes = (dados) => {
    const camposFaltantes = [];
    if (!dados.nome) camposFaltantes.push("Nome");
    if (!dados.email) camposFaltantes.push("e-mail");
    if (!dados.cpf) camposFaltantes.push("CPF");
    if (!dados.telefone) camposFaltantes.push("Telefone");
    if (!dados.endereco?.cep) camposFaltantes.push("CEP");
    if (!dados.endereco?.rua) camposFaltantes.push("Rua");
    if (!dados.endereco?.numero) camposFaltantes.push("Número");
    if (!dados.endereco?.cidade) camposFaltantes.push("Cidade");
    if (!dados.endereco?.estado) camposFaltantes.push("Estado");
    if (camposFaltantes.length > 0) {
      Alert.alert(
        "Dados Incompletos",
        `Os seguintes campos estão faltando: ${camposFaltantes.join(", ")}`,
        [{ text: "OK" }]
      );
    }
  };

  useEffect(() => {
    carregarDadosPerfil();
  }, []);

  const handleSalvar = async () => {
    if (novaSenha && novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "A nova senha e a confirmação não coincidem.", [
        { text: "OK" },
      ]);
      return;
    }

    const dadosPerfil = {
      nome,
      email,
      cpf,
      telefone,
      senha,
      endereco: {
        cep,
        rua,
        numero,
        complemento,
        cidade,
        estado,
      },
      alteracao_senha: {
        senha_atual: senhaAtual,
        nova_senha: novaSenha,
      },
    };

    try {
      const response = await fetch(
        `http://localhost:8081/perfil?username=${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosPerfil),
        }
      );

      if (!response.ok) {
        const errorMessage = `Erro ${response.status}: ${response.statusText}`;
        Alert.alert("Erro", errorMessage, [{ text: "OK" }]);
        return;
      }

      Alert.alert(
        "Sucesso",
        "Dados salvos com sucesso! Redirecionando para PetList",
        [{ text: "OK", onPress: () => navigation.navigate("PetList") }]
      );
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro", `Erro ao conectar ao servidor: ${error.message}`, [
        { text: "OK" },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.smallLogo}>PetFood</Text>
      <Text style={styles.label}>Meu Perfil</Text>

      <TextInput
        style={styles.inputSmall}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.inputSmall}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Rua / Logradouro"
        value={rua}
        onChangeText={setRua}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Complemento"
        value={complemento}
        onChangeText={setComplemento}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Text style={styles.label}>Alteração de senha</Text>
      <TextInput
        style={styles.inputSmall}
        placeholder="Senha atual"
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />
      <TextInput
        style={styles.inputSmall}
        placeholder="Confirmar nova senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAttent} onPress={handleExcluir}>
        <Text style={styles.buttonAttentText}>Excluir Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfile;
