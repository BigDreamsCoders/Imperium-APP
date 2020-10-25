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

export function DetailScreen({ route }) {
  const { params: item } = route;
  return (
    <View style={style.container}>
      <SharedElement id={`photo.${item.id}`}>
        <Image style={style.image} source={{ uri: item.avatar }} />
      </SharedElement>
      <SharedElement id={`text.${item.id}`}>
        <Text style={style.text}>{`${item.first_name} ${item.last_name}`}</Text>
      </SharedElement>
    </View>
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
