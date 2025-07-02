import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

// -> we will follow VCF rule

const NoLibrary = () => {
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setPosition((prev) => (prev < 200 ? prev + 5 : 0));
    }, 50);
    // 50ms
    return () => clearInterval(interval);
  }, []);
  return (
    <View
      style={[
        styles.box,
        {
          marginLeft: position,
        },
      ]}>
      <Text>NoLibrary</Text>
    </View>
  );
};

export default NoLibrary;

const styles = StyleSheet.create({
  box: {
    width: 155,
    height: 155,
    backgroundColor: 'yellow',
  },
});
