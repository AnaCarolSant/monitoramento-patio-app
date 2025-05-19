import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import BottomBar from "../components/BottomBar";

interface Setor {
  id: string;
  nome: string;
  descricao: string;
  patioId: string;
}

export default function SetoresAllScreen() {
  const [setores, setSetores] = useState<Setor[]>([]);

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const savedSetores = await AsyncStorage.getItem("@mottu_setores");
        if (savedSetores) {
          setSetores(JSON.parse(savedSetores));
        }
      } catch (error) {
        console.error("Erro ao carregar setores:", error);
      }
    };
    carregarSetores();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>
      <Text style={styles.title}>Todos os Setores</Text>
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
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  logoContainer: { alignItems: "flex-end",marginTop: 25,marginBottom: 20  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5fc330",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  listContent: { paddingBottom: 20 },
  setorItem: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  setorNome: { fontSize: 18, fontWeight: "bold", color: "#000" },
  setorDescricao: { fontSize: 15, color: "#000", marginTop: 4 },
  emptyText: { color: "#fff", textAlign: "center", marginTop: 20 },
});