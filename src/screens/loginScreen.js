import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';
import LoginForm from '../forms/loginForm';
import { formStyle } from '../style/form';
import colors from '../utils/colors';
import { style as logoStyle } from './../style/logo';

const { width } = Dimensions.get('screen');

export function LoginScreen() {
  const formRef = useRef();
  const { removeListener, addListener } = useNavigation();
  const onForgot = async () => {
    await formRef.current.bounceOut(200);
  };

  useEffect(() => {
    const callbackIn = () => {
      formRef.current.bounceIn(700);
      formRef.current.slideInUp(700);
    };
    const callbackOut = () => {
      formRef.current.bounceOut(700);
    };
    addListener('focus', callbackIn);
    addListener('blur', callbackOut);
    return () => {
      removeListener('focus', callbackIn);
      removeListener('blur', callbackOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Animatable.View
        animation="slideInUp"
        duration={200}
        ref={formRef}
        style={formStyle.container}>
        <LoginForm buttonText="Sign in" onForgot={onForgot} />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.royal_blue,
  },
  logo: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    color: '#1890FF',
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
  },
});
