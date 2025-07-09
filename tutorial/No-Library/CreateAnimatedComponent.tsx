import { StyleSheet, Text, View, Animated, TouchableOpacity, useAnimatedValue } from 'react-native';
import React from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const CreateAnimatedComponent = () => {
  const scale = useAnimatedValue(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <AnimatedTouchable
        style={[
          {
            borderWidth: StyleSheet.hairlineWidth,
            padding: 20,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            marginHorizontal: 'auto',
          },
          {
            transform: [{ scale }],
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text>Press here!</Text>
      </AnimatedTouchable>
    </View>
  );
};

export default CreateAnimatedComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});
