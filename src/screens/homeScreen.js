// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { album } from '../api/users';
import { AuthContext } from '../context/auth';
import colors from '../utils/colors';

export function HomeScreen({ navigation }) {
  const {
    state: { token },
  } = useContext(AuthContext);
  return (
    <View style={style.container}>
      <StatusBar backgroundColor={colors.royal_blue} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.royal_blue,
  },
  card: {
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 3,
  },
  text: {
    fontSize: 24,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});
