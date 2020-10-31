import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../utils/colors';

export function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={StyleSheet.compose(style.button, style.primary)}
      onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export function BlueButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={StyleSheet.compose(style.button, style.blue)}
      onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    padding: 4,
    borderRadius: 20,
  },
  primary: {
    backgroundColor: colors.yellow_patito,
    color: colors.royal_blue,
  },
  blue: {
    backgroundColor: colors.royal_blue,
    color: colors.yellow,
  },

  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
