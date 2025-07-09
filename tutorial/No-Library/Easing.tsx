import {
  Animated,
  Easing,
  EasingFunction,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from 'react-native';
import React, { useRef } from 'react';

const EasingComponent = () => {
  // one way
  //   const animatedValue = useRef(new Animated.Value(0)).current;
  //   other way
  const animatedValue = useAnimatedValue(0);
  const startAnimation = (EasingFunction: (value: number) => number) => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 2000,
      easing: EasingFunction,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          },
        ]}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.buttonContainer}>
        <EasingButton name="Linear" onPress={() => startAnimation(Easing.linear)} />
        <EasingButton name="Bounce" onPress={() => startAnimation(Easing.bounce)} />
        <EasingButton name="Elastic" onPress={() => startAnimation(Easing.elastic(1))} />
        <EasingButton name="Back" onPress={() => startAnimation(Easing.back(1.5))} />
        <EasingButton name="Ease" onPress={() => startAnimation(Easing.ease)} />
        <EasingButton name="Cubic" onPress={() => startAnimation(Easing.cubic)} />
        <EasingButton name="Quad" onPress={() => startAnimation(Easing.quad)} />
        <EasingButton
          name="Bezier"
          onPress={() => startAnimation(Easing.bezier(0.25, 0.1, 0.25, 1))}
        />
        <EasingButton name="Circle" onPress={() => startAnimation(Easing.circle)} />
        <EasingButton name="Sin" onPress={() => startAnimation(Easing.sin)} />
        <EasingButton name="Exp" onPress={() => startAnimation(Easing.exp)} />
        <EasingButton name="In" onPress={() => startAnimation(Easing.in(Easing.ease))} />
        <EasingButton name="Out" onPress={() => startAnimation(Easing.out(Easing.ease))} />
        <EasingButton name="InOut" onPress={() => startAnimation(Easing.inOut(Easing.ease))} />
        <TouchableOpacity style={styles.resetButton} onPress={() => animatedValue.setValue(0)}>
          <Text style={{ color: 'white' }}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Helper component for easing buttons
const EasingButton = ({ name, onPress }: { name: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>{name}</Text>
  </TouchableOpacity>
);

export default EasingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  buttonContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  resetButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 10,
  },
});
