import './global.css';

import 'react-native-gesture-handler';

// import RootStack from './navigation';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
  Easing,
} from 'react-native';
import NoLibrary from 'tutorial/No-Library/NoLibrary';
import Baiscs from 'tutorial/No-Library/Baiscs';
import Values from 'tutorial/No-Library/Values';
import Interpolation from 'tutorial/No-Library/Interpolation';
import AnimTypes from 'tutorial/No-Library/AnimTypes';
// import Easing from 'tutorial/No-Library/Easing';
import NestingFunction from 'tutorial/No-Library/NestingFunction';
import Event from 'tutorial/No-Library/Event';
import CreateAnimatedComponent from 'tutorial/No-Library/CreateAnimatedComponent';
import LayoutAnimationComponent from 'tutorial/No-Library/LayoutAnimation';
import ScrollEvents from 'tutorial/No-Library/ScrollEvents';
import RnBasics from 'tutorial/Library/RnBasics';

export default function App() {
  return (
    <View style={[styles.container, { backgroundColor: 'white', padding: 20 }]}>
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
      {/* <ScrollEvents /> */}
      {/* Reanimated */}
      <RnBasics />
      {/* <Practice /> */}
    </View>
  );
}

const Practice = () => {
  const BANNER_HEIGHT = 200;
  const scrollY = useAnimatedValue(0);
  const animatedValue = useAnimatedValue(0);

  const bannerHeight = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [BANNER_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const startAnimation = (EasingFunction: (value: number) => number) => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
      easing: EasingFunction,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.banner,
          {
            height: bannerHeight,
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [0, BANNER_HEIGHT],
                  outputRange: [1, 1],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
            ],
          },
        ]}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Banner
        </Text>
      </Animated.View>
      <ScrollView
        onScrollBeginDrag={(event) => {
          // console.log('event', event.nativeEvent.contentOffset.y);
          startAnimation(Easing.cubic);
        }}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        // onScroll={}
        // scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
        }}>
        {Array.from({ length: 10 }).map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                height: 350,
                backgroundColor: 'yellow',
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // padding: 20,
    // gap: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  banner: {
    width: '100%',
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },
});
