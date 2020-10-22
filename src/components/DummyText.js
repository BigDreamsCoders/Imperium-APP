import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function DummyText({ children }) {
  return <Text style={style.mainText}>{children}</Text>;
}

const style = StyleSheet.create({
  mainText: {
    color: 'crimson',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
