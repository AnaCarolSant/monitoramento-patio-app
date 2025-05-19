import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import MenuItem from "../components/MenuItem";
import BottomBar from "../components/BottomBar";

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <ScrollView contentContainerStyle={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <MenuItem title="Patios" icon="location-outline" onPress={() => navigation.navigate("Patios" as never)} />
        <MenuItem title="Setores" icon="grid-outline" onPress={() => navigation.navigate("SetoresAll" as never)} />
        <MenuItem title="Motos" icon="bicycle-outline" onPress={() => navigation.navigate("Motos" as never)} />
        <MenuItem
          title="Cadastrar"
          icon="add-circle-outline"
          onPress={() => navigation.navigate("CadastroMoto" as never)}
        />
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
  menuContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingBottom: 32,
  },
});