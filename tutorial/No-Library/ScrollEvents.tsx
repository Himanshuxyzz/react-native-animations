import { Animated, FlatList, StyleSheet, Text, useAnimatedValue, View } from 'react-native';
import React from 'react';

const HeaderHeight = 80;
const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

const ScrollEvents = () => {
  const scrollValue = useAnimatedValue(0);
  const hedaerHeight = scrollValue.interpolate({
    inputRange: [0, HeaderHeight],
    outputRange: [HeaderHeight, 40],
    extrapolate: 'clamp',
  });

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: hedaerHeight,
          },
        ]}>
        <Text style={styles.headerText}>Collapsable header</Text>
      </Animated.View>

      <FlatList
        scrollEventThrottle={16} //this will trigger the scroll event every 16ms which can prevent the scroll event from being triggered too often
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: HeaderHeight,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollValue },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      />
    </View>
  );
};

export default ScrollEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007bff',
    zIndex: 1000,
    elevation: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  itemContainer: {
    backgroundColor: '#444',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
