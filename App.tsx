import { StyleSheet, View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});




