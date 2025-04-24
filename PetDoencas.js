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
import styles from "./Styles";
import { useNavigation, useRoute } from "@react-navigation/native";

const PetDoencas = ({ navigation }) => {
  const [diabetes, setDiabetes] = useState(false);
  const [obesidade, setObesidade] = useState(false);
  const [gastro, setGastro] = useState(false);
  const [renais, setRenais] = useState(false);

  return (
    <View style={styles.scrollView}>
      <Text style={styles.smallLogo}>PetFood</Text>
      <Text style={styles.petImg} source={{}} />
      <Text style={styles.label}>[PetName]</Text>
      <Text style={styles.title}>Doenças</Text>

      <View style={styles.container2}>
        <View style={styles.switchContainer}>
          <Text>Diabetes</Text>
          <Switch value={diabetes} onValueChange={setDiabetes} />
        </View>

        <View style={styles.switchContainer}>
          <Text>Obesidade</Text>
          <Switch value={obesidade} onValueChange={setObesidade} />
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text>Problemas Gastrointestinais</Text>
        <Switch value={gastro} onValueChange={setGastro} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Problemas Renais</Text>
        <Switch value={renais} onValueChange={setRenais} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PetProfile")}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PetDoencas;
