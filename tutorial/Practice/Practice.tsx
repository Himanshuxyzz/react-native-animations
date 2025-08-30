import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Practice = () => {
  return (
    <View style={styles.container}>
      <Text>Practice</Text>
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
