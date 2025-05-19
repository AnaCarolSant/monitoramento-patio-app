"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import BottomBar from "../components/BottomBar";

export default function CadastroMotoScreen() {
  const navigation = useNavigation();
  const [modelo, setModelo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [setorId, setSetorId] = useState("");
  const [formData, setFormData] = useState<any>(null);

  const handleSubmit = async () => {
    if (!modelo || !codigo || !setorId) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    const novaMoto = {
      id: Date.now().toString(),
      setorId,
      modelo,
      codigo,
      entrada: new Date().toLocaleDateString("pt-BR"),
      saida: null,
    };

    setFormData(novaMoto);

    try {
      const savedMotos = await AsyncStorage.getItem("@mottu_motos");
      let motos = [];

      if (savedMotos) {
        motos = JSON.parse(savedMotos);
      }

      motos.push(novaMoto);

      await AsyncStorage.setItem("@mottu_motos", JSON.stringify(motos));

      Alert.alert("Sucesso", "Moto cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar moto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados");
    }
  };

  const limparFormulario = () => {
    setModelo("");
    setCodigo("");
    setSetorId("");
    setFormData(null);
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <Text style={styles.title}>Cadastrar Moto</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Modelo da Moto</Text>
            <TextInput
              style={styles.input}
              value={modelo}
              onChangeText={setModelo}
              placeholder="Digite o modelo"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Código IOT</Text>
            <TextInput
              style={styles.input}
              value={codigo}
              onChangeText={setCodigo}
              placeholder="Digite o código"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ID do Setor</Text>
            <TextInput
              style={styles.input}
              value={setorId}
              onChangeText={setSetorId}
              placeholder="Digite o ID do setor"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={limparFormulario} activeOpacity={0.7}>
              <Text style={styles.buttonTextSecondary}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {formData && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Dados Cadastrados:</Text>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Modelo:</Text>
              <Text style={styles.previewValue}>{formData.modelo}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Código:</Text>
              <Text style={styles.previewValue}>{formData.codigo}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Setor ID:</Text>
              <Text style={styles.previewValue}>{formData.setorId}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Data de Entrada:</Text>
              <Text style={styles.previewValue}>{formData.entrada}</Text>
            </View>
          </View>
        )}
      </ScrollView>

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
    alignItems: "flex-end",
    marginTop: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5fc330",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    width: "45%",
  },
  buttonText: {
    color: "#5fc330",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000000",
    padding: 12,
    alignItems: "center",
    width: "45%",
  },
  buttonTextSecondary: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewContainer: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
  },
  previewItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  previewLabel: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
    width: 120,
  },
  previewValue: {
    fontSize: 16,
    color: "#000000",
  },
});