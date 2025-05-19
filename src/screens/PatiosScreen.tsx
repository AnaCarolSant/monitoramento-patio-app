"use client";

import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import PatioItem from "../components/PatioItem";
import BottomBar from "../components/BottomBar";

type RootStackParamList = {
  Login: undefined;
  Menu: undefined;
  Patios: undefined;
  Setores: { patioId: string };
  Motos: undefined;
  CadastroMoto: undefined;
  Perfil: undefined;
};

interface Patio {
  id: string;
  nome: string;
  localizacao: string;
}

export default function PatiosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Patios">>();
  const [patios, setPatios] = useState<Patio[]>([]);

  useEffect(() => {
    const carregarPatios = async () => {
      try {
        const savedPatios = await AsyncStorage.getItem("@mottu_patios");
        if (savedPatios) {
          setPatios(JSON.parse(savedPatios));
        } else {
          const patiosMock = [
            { id: "1", nome: "NOME DO PATIO 1", localizacao: "LOCALIZAÇÃO 1" },
            { id: "2", nome: "NOME DO PATIO 2", localizacao: "LOCALIZAÇÃO 2" },
            { id: "3", nome: "NOME DO PATIO 3", localizacao: "LOCALIZAÇÃO 3" },
          ];
          setPatios(patiosMock);
          await AsyncStorage.setItem("@mottu_patios", JSON.stringify(patiosMock));
        }
      } catch (error) {
        console.error("Erro ao carregar patios:", error);
      }
    };

    carregarPatios();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <Text style={styles.title}>Patios</Text>

      <FlatList
        data={patios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PatioItem
            nome={item.nome}
            localizacao={item.localizacao}
            onPress={() => navigation.navigate("Setores", { patioId: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={{ color: "#fff", textAlign: "center" }}>Nenhum pátio encontrado.</Text>}
        contentContainerStyle={styles.listContent}
      />

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
  listContent: {
    paddingBottom: 20,
  },
});