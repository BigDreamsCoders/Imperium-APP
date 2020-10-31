import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';
import { login } from '../api/authentication';
import EmailForm from '../forms/loginForm';
import colors from '../utils/colors';
import { style as logoStyle } from './../style/logo';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.royal_blue} animated={true} />
      <View style={styles.logo}>
        <SharedElement id={'logo'}>
          <Animatable.Image
            source={require('./../assets/logo.png')}
            style={logoStyle.logo}
          />
        </SharedElement>
      </View>
      <EmailForm buttonText="Sign in" onSubmit={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.royal_blue,
    //paddingVertical:100
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    color: '#1890FF',
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
  },
});

export default LoginScreen;
