import './global.css';

import 'react-native-gesture-handler';

// import RootStack from './navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NoLibrary from 'tutorial/No-Library/NoLibrary';
import Baiscs from 'tutorial/No-Library/Baiscs';
import Values from 'tutorial/No-Library/Values';
import Interpolation from 'tutorial/No-Library/Interpolation';
import AnimTypes from 'tutorial/No-Library/AnimTypes';
import Easing from 'tutorial/No-Library/Easing';
import NestingFunction from 'tutorial/No-Library/NestingFunction';
import Event from 'tutorial/No-Library/Event';
import CreateAnimatedComponent from 'tutorial/No-Library/CreateAnimatedComponent';
import LayoutAnimationComponent from 'tutorial/No-Library/LayoutAnimation';
import ScrollEvents from 'tutorial/No-Library/ScrollEvents';

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
      {/* <Interpolation /> */}
      {/* <AnimTypes /> */}
      {/* <Easing /> */}
      {/* <NestingFunction /> */}
      {/* <Event /> */}
      {/* <CreateAnimatedComponent /> */}
      {/* <LayoutAnimationComponent /> */}
      <ScrollEvents />
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
