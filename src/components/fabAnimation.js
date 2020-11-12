import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import colors from '../utils/colors';

export function FabButton({ onPress, render }) {
  const [scaleValue] = useState(new Animated.Value(0));
  const onButtonPress = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      scaleValue.setValue(0);
    });
    onPress();
  };

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [1, 20, 30],
  });

  return (
    <>
      <Animated.View
        style={[
          style.container,
          { transform: [{ scale: scaleValueInterpolation }] },
        ]}
      />
      {render(onButtonPress)}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    right: 0,
    bottom: 0,
    marginRight: 8,
    backgroundColor: colors.yellow_patito,
  },
});
