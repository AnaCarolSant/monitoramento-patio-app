import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import BottomBar from "../components/BottomBar";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lembrarCredenciais, setLembrarCredenciais] = useState(false);

  useEffect(() => {
    const carregarCredenciais = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem("@mottu_username");
        const savedPassword = await AsyncStorage.getItem("@mottu_password");
        const savedLembrar = await AsyncStorage.getItem("@mottu_lembrar");

        if (savedUsername && savedPassword && savedLembrar === "true") {
          setUsername(savedUsername);
          setPassword(savedPassword);
          setLembrarCredenciais(true);
        }
      } catch (error) {
        console.error("Erro ao carregar credenciais:", error);
      }
    };

    carregarCredenciais();
  }, []);

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (lembrarCredenciais) {
      try {
        await AsyncStorage.setItem("@mottu_username", username);
        await AsyncStorage.setItem("@mottu_password", password);
        await AsyncStorage.setItem("@mottu_lembrar", "true");
      } catch (error) {
        console.error("Erro ao salvar credenciais:", error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("@mottu_username");
        await AsyncStorage.removeItem("@mottu_password");
        await AsyncStorage.removeItem("@mottu_lembrar");
      } catch (error) {
        console.error("Erro ao limpar credenciais:", error);
      }
    }

    navigation.navigate("Menu" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sing In</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Digite seu usuário"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setLembrarCredenciais(!lembrarCredenciais)}>
          <View style={[styles.checkbox, lembrarCredenciais && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Lembrar credenciais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  formContainer: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#000000",
    borderRadius: 4,
    padding: 12,
    color: "#ffffff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000000",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#000000",
  },
  checkboxLabel: {
    color: "#000000",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    alignSelf: "center",
    width: 120,
  },
  buttonText: {
    color: "#5fc330",
    fontSize: 16,
    fontWeight: "bold",
  },
});