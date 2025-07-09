import {
  View,
  Text,
  StyleSheet,
  Animated,
  useAnimatedValue,
  Dimensions,
  Easing,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Button } from 'components/Button';

// VCF RULE ->
// 1. create animated values
// 2. attach values to the components
// 3. animate the values with functions

// TYPES OF ANIMATION FUNCTIONS IN THE REACT NATIVE

// DECAY
// 1. decay
// 2. spring
// 3. timing

const AnimTypes = () => {
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  const springValue = useAnimatedValue(0);
  const decayValue = useAnimatedValue(0);
  const timingValue = useAnimatedValue(0);

  // DECAY ANIMATION

  // it gradually slows down the animation till the end or slowing factor or also can say that the rust factor affects slowly
  const startDecay = () => {
    Animated.decay(decayValue, {
      useNativeDriver: true,
      velocity: 1,
      deceleration: 0.9,
    }).start();
  };

  const interpolatedXdecay = decayValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 300],
  });

  // SPRING ANIMATION

  const startSpring = () => {
    Animated.spring(springValue, {
      useNativeDriver: true,
      toValue: 100, //it is the final value of the animation
      // bounciness: 1,
      // speed: 1,
      // damping: 1, //it provides a spring kinda effect once we pull the spring it will oscilates and then it will come to the original position for some duration
      //friction: 10, // using this we can kinda simulate the amount of friction that is applied to the spring for suppose if we set it to 0 then it means no friction
      //tension: 10, //it is the amount of tension that is applied to the spring for suppose if we set it to 0 then it means no tension and it will be a very stiff spring
      damping: 10,
    }).start();
  };

  // notes about interpolation
  // When springValue is 0, the box position is 0
  // When springValue is 100, the box position is 200
  // And for any value in between, it calculates proportionally:
  // When springValue is 50, the box moves 100 pixels
  // When springValue is 25, the box moves 50 pixels
  // That's what interpolation does - it creates a relationship between your animation value and how things look on screen.

  const animatedSpring = {
    transform: [
      {
        translateX: springValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 200],
          // extrapolate: 'clamp',
        }),
      },
    ],
  };

  // TIMING ANIMATION

  const startTiming = () => {
    Animated.timing(timingValue, {
      toValue: 100,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.bounce,
    }).start();
  };

  const AnimatedTimingX = {
    transform: [
      {
        translateX: timingValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 200],
        }),
      },
    ],
  };

  const startAnimation = () => {
    startDecay();
    startSpring();
    startTiming();
  };

  const resetAnimation = () => {
    decayValue.setValue(0);
    springValue.setValue(0);
    timingValue.setValue(0);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box1,
          {
            transform: [
              {
                translateX: interpolatedXdecay,
              },
            ],
          },
        ]}
      />
      <Animated.View style={[styles.box2, animatedSpring]} />
      <Animated.View style={[styles.box3, AnimatedTimingX]} />

      <Button title="Start Animation" onPress={startAnimation} />
      <Button title="Reset" onPress={resetAnimation} />
    </View>
  );
};

export default AnimTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 12,
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 12,
  },
});
