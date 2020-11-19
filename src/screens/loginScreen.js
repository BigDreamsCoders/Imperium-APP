import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginForm from '../forms/loginForm';
import { formStyle } from '../style/form';
import colors from '../utils/colors';
import { style as logoStyle } from './../style/logo';
import { AuthContext } from '../context/auth';
import { login as onSubmit } from '../api/authentication';
import styled from 'styled-components/native';
import { Loader } from '../components/loader';
import { useMutation } from 'react-query';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('screen');

const LoaderWrapper = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export function LoginScreen() {
  const { login } = useContext(AuthContext);

  const formRef = useRef();
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);
  const { removeListener, addListener } = useNavigation();

  const [loginMutation, { isLoading }] = useMutation(onSubmit, {
    onSuccess: (data) => {
      login({ token: data.token });
    },
    onError: (e) => {
      const message = {
        message: 'No nos pudimos conectar con el servidor',
        type: 'danger',
      };
      if (e?.response?.data) {
        switch (e.response.data.statusCode) {
          case 401: {
            message.message = 'Credenciales erroneas';
            break;
          }
          default: {
            message.message = 'Algo salió mal';
            break;
          }
        }
      }
      showMessage(message);
    },
  });

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
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}>
      <StatusBar backgroundColor={colors.royal_blue} animated={true} />
      {isLoading && (
        <LoaderWrapper>
          <Loader color={colors.yellow_patito} />
        </LoaderWrapper>
      )}
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
        style={[formStyle.container, styles.keyboard]}>
        <LoginForm
          buttonText="Sign in"
          onSubmit={loginMutation}
          onForgot={onForgot}
        />
      </Animatable.View>
    </KeyboardAwareScrollView>
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
  keyboard: (keyboardIsShowing) => ({
    flex: keyboardIsShowing ? 2 : 1,
    justifyContent: keyboardIsShowing ? 'flex-start' : 'center',
  }),
});
