import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { style } from '../style/logo';
import * as Animatable from 'react-native-animatable';
import colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { RestorePasswordForm } from '../forms/restorPasswordForm';
import { BackArrow } from '../style/button';
import { formStyle } from '../style/form';
import { useMutation } from 'react-query';
import { restorePassword } from '../api/users';
import styled from 'styled-components/native';
import { Loader } from '../components/loader';
import { showMessage } from 'react-native-flash-message';

const LoaderWrapper = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export function ForgotScreen() {
  const { goBack, addListener, removeListener } = useNavigation();
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);
  const formRef = useRef();

  const [restoreMutation, { isLoading }] = useMutation(restorePassword, {
    onSuccess: () => {
      goBack();
      showMessage({
        message: 'Se ha reenviado una contraseña a tu correo',
        type: 'success',
      });
    },
    onError: (e) => {
      const message = {
        message: 'No nos pudimos conectar con el servidor',
        type: 'danger',
      };
      if (e?.response?.data) {
        switch (e.response.data.statusCode) {
          case 400: {
            message.message = 'Usuario no encontrado';
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

  useEffect(() => {
    const callback = () => {
      formRef.current.bounceOut(300);
    };
    addListener('beforeRemove', callback);
    const fullSize = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShowing(true);
    });
    const normalSize = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShowing(false);
    });
    return () => {
      removeListener('beforeRemove', callback);
      Keyboard.removeSubscription(fullSize);
      Keyboard.removeSubscription(normalSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <BackArrow
        callback={() => {
          formRef.current.bounceOut();
          goBack();
        }}
      />
      {isLoading && (
        <LoaderWrapper>
          <Loader color={colors.yellow_patito} />
        </LoaderWrapper>
      )}
      <View style={styles.logo}>
        <SharedElement id={'logo'}>
          <Animatable.Image
            source={require('./../assets/logo.png')}
            style={style.logo}
          />
        </SharedElement>
      </View>
      <Animatable.View
        style={[
          formStyle.container,
          styles.formContainer,
          styles.keyboard(keyboardIsShowing),
        ]}
        animation="slideInUp"
        ref={formRef}
        duration={200}>
        <RestorePasswordForm callback={restoreMutation} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
  },
  keyboard: (keyboardIsShowing) => {
    return {
      flex: keyboardIsShowing ? 2 : 1,
      justifyContent: keyboardIsShowing ? 'flex-start' : 'center',
    };
  },
});
