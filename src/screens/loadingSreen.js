import React, { useContext } from 'react';
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native';
import colors from '../utils/colors';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/auth';
import { PrimaryButton } from '../style/button';
import { SharedElement } from 'react-navigation-shared-element';
import { style as logoStyle } from '../style/logo';
import constants from '../utils/constants';

const { height, width } = Dimensions.get('screen');

export function Loading({ navigation }) {
  const {
    state: { isLoading },
  } = useContext(AuthContext);
  const animatinoProps = {
    animation: !isLoading ? 'pulse' : 'bounceIn',
    iterationCount: isLoading ? 1 : 'infinite',
    easing: 'ease-out',
  };
  return (
    <View style={style.container}>
      <StatusBar backgroundColor={colors.royal_blue} />
      <View style={style.header}>
        <SharedElement id={'logo'}>
          <Animatable.Image
            source={require('./../assets/logo.png')}
            {...animatinoProps}
            style={logoStyle.logo}
            duration={2000}
          />
        </SharedElement>
        {!isLoading && (
          <PrimaryButton
            title="Comenzar"
            onPress={() => {
              navigation.replace(constants.SCREENS.LOGIN);
            }}
          />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.royal_blue,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
