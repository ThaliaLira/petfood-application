import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";
//import { useNavigation, useRoute } from "@react-navigation/native";

const PetList = ({ navigation }) => {
  return (
    <View style={styles.scrollView}>
      <Text style={styles.smallLogo}>PetFood</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PetProfile")}
      >
        <Text style={styles.buttonText}>Adicionar Pet</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PetList;
