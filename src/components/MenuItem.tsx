import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuItemProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function MenuItem({ title, icon, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={32} color="#5fc330" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000", 
    borderRadius: 16,
    padding: 16,
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderWidth: 8, 
    borderColor: "#5fc330", 
  },
  title: {
    color: "#5fc330", 
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
});