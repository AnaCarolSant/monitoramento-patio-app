"use client";

import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import BottomBar from "../components/BottomBar";

interface Setor {
  id: string;
  nome: string;
  descricao: string;
  patioId: string;
}

export default function SetorScreen() {
  const route = useRoute();
  const { patioId } = route.params as { patioId: string };
  const [setores, setSetores] = useState<Setor[]>([]);
  const [novoSetor, setNovoSetor] = useState({ nome: "", descricao: "" });
  const [adicionando, setAdicionando] = useState(false);

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const savedSetores = await AsyncStorage.getItem("@mottu_setores");
        if (savedSetores) {
          const setoresAll = JSON.parse(savedSetores) as Setor[];
          setSetores(setoresAll.filter((s) => s.patioId === patioId));
        }
      } catch (error) {
        console.error("Erro ao carregar setores:", error);
      }
    };
    carregarSetores();
  }, [patioId]);

  const handleAdicionarSetor = async () => {
    if (!novoSetor.nome) {
      Alert.alert("Erro", "O nome do setor é obrigatório");
      return;
    }
    try {
      const novo: Setor = {
        id: Date.now().toString(),
        nome: novoSetor.nome,
        descricao: novoSetor.descricao,
        patioId,
      };
      const savedSetores = await AsyncStorage.getItem("@mottu_setores");
      const setoresAll = savedSetores ? JSON.parse(savedSetores) : [];
      const atualizados = [...setoresAll, novo];
      await AsyncStorage.setItem("@mottu_setores", JSON.stringify(atualizados));
      setSetores((prev) => [...prev, novo]);
      setNovoSetor({ nome: "", descricao: "" });
      setAdicionando(false);
    } catch (error) {
      console.error("Erro ao adicionar setor:", error);
      Alert.alert("Erro", "Não foi possível adicionar o setor");
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <Text style={styles.title}>Setores do Pátio</Text>

      <FlatList
        data={setores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.setorItem}>
            <Text style={styles.setorNome}>{item.nome}</Text>
            <Text style={styles.setorDescricao}>{item.descricao}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum setor cadastrado.</Text>}
        contentContainerStyle={styles.listContent}
      />

      {adicionando ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do setor"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={novoSetor.nome}
            onChangeText={(text) => setNovoSetor((s) => ({ ...s, nome: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={novoSetor.descricao}
            onChangeText={(text) => setNovoSetor((s) => ({ ...s, descricao: text }))}
          />
          <TouchableOpacity style={styles.button} onPress={handleAdicionarSetor}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => setAdicionando(false)}>
            <Text style={styles.buttonTextSecondary}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setAdicionando(true)}>
          <Text style={styles.buttonText}>Adicionar Setor</Text>
        </TouchableOpacity>
      )}

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
    marginBottom: 20, // opcional: adicione um pequeno espaçamento abaixo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5fc330",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  setorItem: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  setorNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  setorDescricao: {
    fontSize: 15,
    color: "#000",
    marginTop: 4,
  },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#000000",
    borderRadius: 4,
    padding: 12,
    color: "#ffffff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
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
    marginTop: 8,
  },
  buttonTextSecondary: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});