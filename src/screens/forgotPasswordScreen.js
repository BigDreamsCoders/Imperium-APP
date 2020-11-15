import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { style } from '../style/logo';
import * as Animatable from 'react-native-animatable';
import colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RestorePasswordForm } from '../forms/restorPasswordForm';
import { BackArrow } from '../style/button';
import { formStyle } from '../style/form';

export function ForgotScreen() {
  const { goBack, addListener, removeListener } = useNavigation();
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);
  const formRef = useRef();

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
          {
            flex: keyboardIsShowing ? 2 : 1,
            justifyContent: keyboardIsShowing ? 'flex-start' : 'center',
          },
        ]}
        animation="slideInUp"
        ref={formRef}
        duration={200}>
        <RestorePasswordForm />
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
});
