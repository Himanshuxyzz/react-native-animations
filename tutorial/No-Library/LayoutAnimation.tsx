import { StyleSheet, Text, View, LayoutAnimation, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const LayoutAnimationComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    LayoutAnimation.spring();
    setExpanded(!expanded);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleExpanded}>
        <Text style={styles.buttonText}>{expanded ? 'Collapse' : 'Expand'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <Text>Content</Text>
        </View>
      )}
    </View>
  );
};

export default LayoutAnimationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginHorizontal: 'auto',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    backgroundColor: '#0f0f',
  },
});
