import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import RadioGroup from "react-native-radio-buttons-group";
import styles from "./Styles";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PetProfile({ navigation }) {
  const radioButtonsAnimal = useMemo(
    () => [
      {
        id: "1",
        label: "Cachorro",
        value: "Cachorro",
        borderColor: "#999",
        borderSize: 1,
        size: 20,
        labelStyle: styles.radioText,
      },
      {
        id: "2",
        label: "Gato",
        value: "Gato",
        borderColor: "#999",
        borderSize: 1,
        size: 20,
        labelStyle: styles.radioText,
      },
    ],
    []
  );
  const radioButtonsSex = useMemo(
    () => [
      {
        id: "1",
        label: "Macho",
        value: "Macho",
        borderColor: "#999",
        borderSize: 1,
        size: 20,
        labelStyle: styles.radioText,
      },
      {
        id: "2",
        label: "Fêmea",
        value: "Femea",
        borderColor: "#999",
        borderSize: 1,
        size: 20,
        labelStyle: styles.radioText,
      },
    ],
    []
  );
  const [idAnimal, setIdAnimal] = useState();
  const [idSex, setIdSex] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.smallLogo}>PetFood</Text>
      <Image style={styles.petImg} source={{}} />

      <TextInput
        style={styles.inputSmall}
        placeholder="Nome"
        value={PetName}
        onChangeText={setPetName}
      />

      <RadioGroup
        style={styles.radio}
        radioButtons={radioButtonsAnimal}
        onPress={setIdAnimal}
        selectedId={idAnimal}
        layout="row"
      />

      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Raça - Selecione" value="" />
        <Picker.Item label="Border Collie" value="BorderCollie" />
        <Picker.Item label="Golden Retriever" value="GoldenRetriever" />
        <Picker.Item label="Husky" value="Husky" />
        <Picker.Item label="Pastor Alemão" value="PastorAlemao" />
        <Picker.Item label="Poolde" value="Poodle" />
        <Picker.Item label="Pug" value="Pug" />
        <Picker.Item label="Rottweiler" value="Rottweiler" />
        <Picker.Item label="Shih Tzu" value="ShihTzu" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>

      <TextInput
        style={styles.inputSmall}
        placeholder="Data nascimento dd/mm/aaaa"
        value={email}
        onChangeText={setEmail}
      />
      <RadioGroup
        containerStyle={styles.radio}
        radioButtons={radioButtonsSex}
        onPress={setIdSex}
        selectedId={idSex}
        layout="row"
      />
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Nível de Atividade" value="" />
        <Picker.Item label="Baixo" value="Baixo" />
        <Picker.Item label="Médio" value="Medio" />
        <Picker.Item label="Alto" value="Alto" />
      </Picker>

      <TouchableOpacity style={styles.inputsmall}>
        onPress={() => navigation.navigate("PetDoencas")}
        <Text style={styles.buttonText}>Doenças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.inputsmall}>
        onPress={() => navigation.navigate("PetPrefs")}
        <Text style={styles.buttonText}>Preferências e Alergias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAttent}>
        <Text style={styles.buttonAttentText}>Excluir Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
