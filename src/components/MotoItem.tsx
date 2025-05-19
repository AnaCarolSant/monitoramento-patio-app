import { View, Text, StyleSheet } from "react-native";

interface MotoItemProps {
  modelo: string;
  codigo: string;
  entrada: string;
  saida?: string | null;
}

export default function MotoItem({ modelo, codigo, entrada, saida }: MotoItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.modelo}>{modelo}</Text>
        <Text style={styles.codigo}>{codigo}</Text>
      </View>
      <View style={styles.datas}>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>ENTRADA</Text>
          <Text style={styles.dataValue}>{entrada}</Text>
        </View>
        {saida && (
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>SAÍDA</Text>
            <Text style={styles.dataValue}>{saida}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5fc330",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modelo: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
  codigo: {
    color: "#000000",
    fontSize: 14,
  },
  datas: {
    marginTop: 8,
  },
  dataRow: {
    flexDirection: "row",
    marginVertical: 2,
  },
  dataLabel: {
    color: "#000000",
    fontSize: 14,
    marginRight: 16,
    width: 70,
  },
  dataValue: {
    color: "#000000",
    fontSize: 14,
  },
});