import './global.css';

import 'react-native-gesture-handler';

// import RootStack from './navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NoLibrary from 'tutorial/No-Library/NoLibrary';
import Baiscs from 'tutorial/No-Library/Baiscs';
import Values from 'tutorial/No-Library/Values';
import Interpolation from 'tutorial/No-Library/Interpolation';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.headerText}>Animations</Text>

      {/* Non Animated API  */}
      {/* <NoLibrary /> */}
      {/* Animated API */}
      {/* <Baiscs /> */}
      {/* <Values /> */}
      <Interpolation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    gap: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
