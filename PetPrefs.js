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

const PetPrefs = ({ navigation }) => {
  const [frango, setFrango] = useState(false);
  const [peixe, setPeixe] = useState(false);
  const [carne, setCarne] = useState(false);
  const [arroz, setArroz] = useState(false);
  const [batata, setBatata] = useState(false);
  const [milho, setMilho] = useState(false);
  const [banana, setBanana] = useState(false);

  return (
    <View style={styles.scrollView}>
      <Text style={styles.smallLogo}>PetFood</Text>
      <Text style={styles.petImg} source={{}} />
      <Text style={styles.label}>[PetName]</Text>
      <Text style={styles.title}>Preferências e Alergias</Text>

      <View style={styles.container2}>
        <View style={styles.switchContainer}>
          <Text>Frango</Text>
          <Switch value={frango} onValueChange={setFrango} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Peixe</Text>
          <Switch value={peixe} onValueChange={setPeixe} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Carne Bovina</Text>
          <Switch value={carne} onValueChange={setCarne} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Arroz</Text>
          <Switch value={arroz} onValueChange={setArroz} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Batata</Text>
          <Switch value={batata} onValueChange={setBatata} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Milho</Text>
          <Switch value={milho} onValueChange={setMilho} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Banana</Text>
          <Switch value={banana} onValueChange={setBanana} />
        </View>
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
export default PetPrefs;
