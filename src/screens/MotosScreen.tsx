"use client";

import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import MotoItem from "../components/MotoItem";
import BottomBar from "../components/BottomBar";

interface Moto {
  id: string;
  setorId: string;
  modelo: string;
  codigo: string;
  entrada: string;
  saida: string | null;
}

export default function MotosScreen() {
  const route = useRoute();
  const { setorId } = (route.params as { setorId?: string }) || {};
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const savedMotos = await AsyncStorage.getItem("@mottu_motos");
        if (savedMotos) {
          const allMotos = JSON.parse(savedMotos) as Moto[];
          const filteredMotos = setorId ? allMotos.filter((moto) => moto.setorId === setorId) : allMotos;
          setMotos(filteredMotos);
        } else {
          const motosMock = [
            {
              id: "1",
              setorId: "1",
              modelo: "MODELO MOTO 1",
              codigo: "CODIGOIOT1",
              entrada: "21/12/2025",
              saida: null,
            },
            {
              id: "2",
              setorId: "1",
              modelo: "MODELO MOTO 2",
              codigo: "CODIGOIOT2",
              entrada: "21/12/2025",
              saida: "22/12/2025",
            },
            {
              id: "3",
              setorId: "2",
              modelo: "MODELO MOTO 3",
              codigo: "CODIGOIOT3",
              entrada: "21/12/2025",
              saida: null,
            },
          ];

          const filteredMotos = setorId ? motosMock.filter((moto) => moto.setorId === setorId) : motosMock;

          setMotos(filteredMotos);
          await AsyncStorage.setItem("@mottu_motos", JSON.stringify(motosMock));
        }
      } catch (error) {
        console.error("Erro ao carregar motos:", error);
      }
    };

    carregarMotos();
  }, [setorId]);

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <Text style={styles.title}>{setorId ? "NOME DO SETOR" : "Todas as Motos"}</Text>

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MotoItem modelo={item.modelo} codigo={item.codigo} entrada={item.entrada} saida={item.saida} />
        )}
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