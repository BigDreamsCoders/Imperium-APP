import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { Header } from '../components/header';
import { Container } from '../style/layouts';

export function DetailScreen() {
  return (
    <Container>
      <Header />
    </Container>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});
