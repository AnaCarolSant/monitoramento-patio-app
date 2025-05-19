import { View, StyleSheet } from "react-native";

export default function BottomBar() {
  return <View style={styles.bar} />;
}

const styles = StyleSheet.create({
  bar: {
    height: 2,
    backgroundColor: "#5fc330",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});