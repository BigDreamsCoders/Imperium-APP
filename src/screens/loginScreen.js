import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';
import LoginForm from '../forms/loginForm';
import { formStyle } from '../style/form';
import colors from '../utils/colors';
import { style as logoStyle } from './../style/logo';

const { width } = Dimensions.get('screen');

export function LoginScreen() {
  const formRef = useRef();
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);
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
    const fullSize = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShowing(true);
    });
    const normalSize = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShowing(false);
    });
    return () => {
      removeListener('focus', callbackIn);
      removeListener('blur', callbackOut);
      Keyboard.removeSubscription(fullSize);
      Keyboard.removeSubscription(normalSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(keyboardIsShowing);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
        style={[formStyle.container, { flex: keyboardIsShowing ? 2 : 1 }]}>
        <LoginForm buttonText="Sign in" onForgot={onForgot} />
      </Animatable.View>
    </KeyboardAvoidingView>
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
