import { StyleSheet, Text, View, Animated, useAnimatedValue } from 'react-native';
import React, { useEffect, useRef } from 'react';

const Values = () => {
  //   const position = useRef(new Animated.Value(0)).current; // old method
  const position = useAnimatedValue(0); // new method using this useAnimatedValue hook which uses same implementation with refs

  //we dont have the hook for the xy values so here we had to use the tradation useRef approach
  const xyValue = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  // For combined positions

  const basePos = useAnimatedValue(50);
  const pos1 = useAnimatedValue(0);

  const combinedPos = Animated.add(basePos, pos1);

  const startAnimateWithTiming = () => {
    Animated.timing(position, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(position, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    });
  };

  const startXYAnimation = () => {
    Animated.timing(xyValue, {
      toValue: {
        x: 120,
        y: -120,
      },
      duration: 5000,
      // this animation will work with both useNativedriver either true or false , on setting this ture it might generate some error
      useNativeDriver: true,
    }).start();
  };

  const startOscillating = () => {
    // To loop the animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pos1, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pos1, {
          toValue: -50,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 5, // if we pass infinity then Infinity loop will happen
      }
    ).start();
  };

  useEffect(() => {
    // startAnimateWithTiming();
    // startXYAnimation();
    // console.log({
    //   'value of x': xyValue.x,
    //   'value of y': xyValue.y,
    // });
    startOscillating();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            marginLeft: position,
          },
        ]}
      />
      {/* the below code can give error like top is not supported in native component so we will use different method */}
      {/* <Animated.View style={[styles.box2, xyValue.getLayout()]} />   // this will work when nativeDriver is false*/}
      {/* <Animated.View
        style={[
          styles.box2,
          {
            transform: xyValue.getTranslateTransform(),
          },
        ]}
      />  // this will work with nativeDriver true  */}
      <Animated.View
        style={[
          styles.box2,
          {
            transform: xyValue.getTranslateTransform(),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                translateX: combinedPos,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Values;

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
  },
  box2: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    gap: 15,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'yellow',
  },
});
