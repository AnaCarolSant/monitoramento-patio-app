import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PatioItemProps {
  nome: string;
  localizacao: string;
  onPress: () => void;
}

export default function PatioItem({ nome, localizacao, onPress }: PatioItemProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.localizacao}>{localizacao}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Ver{"\n"}Setores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
  localizacao: {
    color: "#000000",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    color: "#5fc330",
    fontSize: 12,
    textAlign: "center",
  },
});