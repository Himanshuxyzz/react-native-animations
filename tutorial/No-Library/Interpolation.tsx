import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  StyleSheet,
  useAnimatedValue,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';

const Interpolation = () => {
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  const animatedValue = useAnimatedValue(0);

  //for the pan values we will not use the useAnimated because we have to store the x,y values which is not possible in the useAnimated

  const pan = useRef(new Animated.ValueXY()).current;

  const diffClampY = useRef(Animated.diffClamp(pan.y, -deviceHeight, deviceHeight)).current;
  const diffClampX = useRef(Animated.diffClamp(pan.x, -deviceWidth, deviceWidth)).current;

  const startInterpolation = () => {
    Animated.timing(animatedValue, {
      toValue: 4, //if i change to 2 it will go from 0 to 200 if i set extapolate as clamp and in the case of the exten it will go beyond the 200 and in case of the identity it will go from 0 to 200 and then 200 to 0
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startInterpolation();
  }, []);

  // PAN RESPONDER

  // for the palce where we are using events set useNativeDriver always false
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
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
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });
  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 200],
                  // extrapolate: 'clamp',
                  // extrapolate: 'extend',
                  // extrapolate: 'identity',
                  extrapolateLeft: 'extend',
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
        ]}
      /> */}

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.box2,
          {
            transform: [
              {
                translateY: diffClampY,
              },
              {
                translateX: diffClampX,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Interpolation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
  },
  box2: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
