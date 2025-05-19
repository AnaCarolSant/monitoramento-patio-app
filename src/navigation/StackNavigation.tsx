import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "../screens/LoginScreen";
import MenuScreen from "../screens/MenuScreen";
import PatiosScreen from "../screens/PatiosScreen";
import SetorScreen from "../screens/SetorScreen";
import MotosScreen from "../screens/MotosScreen";
import CadastroMotoScreen from "../screens/CadastroMotoScreen";
import SetoresAllScreen from "../screens/SetoresAllScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#000000" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Patios" component={PatiosScreen} />
          <Stack.Screen name="Setores" component={SetorScreen} />
          <Stack.Screen name="Motos" component={MotosScreen} />
          <Stack.Screen name="CadastroMoto" component={CadastroMotoScreen} />
          <Stack.Screen name="SetoresAll" component={SetoresAllScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
