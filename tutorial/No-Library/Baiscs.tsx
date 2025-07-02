import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

// VCF rule is followed

const Baiscs = () => {
  // This gets re-rendered if you use directly so it's must to use this with useRef which will prevent value accross re-render untill hard refresh occurs
  //   const position = new Animated.Value(0);
  const position = useRef(new Animated.Value(0)).current;

  //   We cant directly use the animated values in the components so we have to Animated component or wither wrap them with Animated.createAnimatedComponent

  console.log(position);

  const startAnimateionWithTiming = () => {
    Animated.timing(position, {
      toValue: 200,
      duration: 2000,
      //   this will run on JS thread
      useNativeDriver: false,
    }).start(() => {
      //   console.log('Animation completed!');
      Animated.timing(position, {
        toValue: 0,
        duration: 2000,
        //   this will run on JS thread
        useNativeDriver: false,
      }).start(() => {
        //   console.log('Animation completed!');
      });
    });
  };

  useEffect(() => {
    startAnimateionWithTiming();
  }, []);
  return (
    <View>
      <Animated.View
        style={[
          styles.box,
          {
            marginLeft: position,
          },
        ]}
      />
    </View>
  );
};

export default Baiscs;

const styles = StyleSheet.create({
  box: {
    width: 155,
    height: 155,
    backgroundColor: 'yellow',
  },
});
