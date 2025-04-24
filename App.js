import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import Login from "./Login";
import NewUserRegistration from "./NewUserRegistration";
import UserProfile from "./UserProfile";
import PetList from "./PetList";
import PetProfile from "./PetProfile";
import PetDoencas from "./PetDoencas";
import PetPrefs from "./PetPrefs";
import styles from "./Styles";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="NewUserRegistration"
            component={NewUserRegistration}
          />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="PetProfile" component={PetProfile} />
          <Stack.Screen name="PetList" component={PetList} />
          <Stack.Screen name="PetDoencas" component={PetDoencas} />
          <Stack.Screen name="PetPrefs" component={PetPrefs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
