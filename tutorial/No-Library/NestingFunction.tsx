import { Animated, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View } from 'react-native';
import React from 'react';

// loop parallel animations

const NestingFunction = () => {
  const box1AnimatedValue = useAnimatedValue(0);
  const box2AnimatedValue = useAnimatedValue(0);

  const AnimatedBox1 = {
    opacity: box1AnimatedValue,
  };

  const AnimatedBox2 = {
    opacity: box2AnimatedValue,
  };

  const startAnimation = () => {
    // box1AnimatedValue.setValue(1);
    // box2AnimatedValue.setValue(1);
    // sequence animations
    let sequenceAnimation = Animated.sequence([
      Animated.timing(box1AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // this will start after box1
      Animated.timing(box2AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    // parallel animations

    let parallelAnimation = Animated.parallel([
      Animated.timing(box1AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // this will start parallel with box1
      Animated.timing(box2AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    // stagger animation
    let staggerAnimation = Animated.stagger(5000, [
      Animated.timing(box1AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // this will start after 5000ms
      Animated.timing(box2AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    // loop animation

    let loopAnimation = Animated.loop(
      Animated.timing(box1AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      { iterations: 5 }
    );

    // sequence loop animation

    let sequenceLoopAnimation = Animated.loop(
      Animated.sequence([
        // Box 1 fade in
        Animated.timing(box1AnimatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Box 1 fade out
        Animated.timing(box1AnimatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Box 2 fade in
        Animated.timing(box2AnimatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Box 2 fade out
        Animated.timing(box2AnimatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    let delayAnimation = Animated.sequence([
      Animated.timing(box1AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(5000),
      Animated.timing(box2AnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    // sequenceAnimation.start();

    // parallelAnimation.start();

    // staggerAnimation.start();
    // loopAnimation.start();
    // sequenceLoopAnimation.start();
    delayAnimation.start();
  };

  const resetAnimation = () => {
    box1AnimatedValue.setValue(0);
    box2AnimatedValue.setValue(0);
  };

  return (
    <View style={styles.container}>
      {/* boxes */}
      <Animated.View style={[styles.box, AnimatedBox1]} />
      <Animated.View style={[styles.box2, AnimatedBox2]} />

      <TouchableOpacity
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'black',
          padding: 16,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => startAnimation()}>
        <Text>Start Animation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'black',
          padding: 16,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => resetAnimation()}>
        <Text>Reset Animation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NestingFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  box: {
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
});
