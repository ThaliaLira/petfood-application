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

const PetDoencas = () => {
  const [diabetes, setDiabetes] = useState(false);
  const [obesidade, setObesidade] = useState(false);

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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PetDoencas;
