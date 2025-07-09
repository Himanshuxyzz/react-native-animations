import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';

const Event = () => {
  // pan responser - for the pan gesture detection
  //   event  - Animated.event which helps to get the native event values

  // VCF RULE

  //   we could not use the useAnimatedValue hook why ? because it doesnt support multiple values like x,y it can hold one value at a time
  const pan = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const scale = useAnimatedValue(1);

  // because the values gets changed frequently that's why   to preveet re-render since we are using the useRef hook
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: (event, gestureState) => {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.box1,
          {
            transform: [...pan.getTranslateTransform(), { scale }],
          },
        ]}
      />
      {/* <Animated.View style={styles.box2} /> */}

      {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text>Start Animation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text>Stop Animation</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
