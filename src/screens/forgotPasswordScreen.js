import React, { forwardRef, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { style } from '../style/logo';
import * as Animatable from 'react-native-animatable';
import colors from '../utils/colors';
import { RestorePasswordForm } from '../forms/restorPasswordForm';
import { useNavigation } from '@react-navigation/native';
import { BackArrow } from '../style/button';
import { formStyle } from '../style/form';

export function ForgotScreen() {
  const { goBack, addListener, removeListener } = useNavigation();
  const formRef = useRef();

  useEffect(() => {
    const callback = () => {
      formRef.current.bounceOut(300);
    };
    addListener('beforeRemove', callback);
    return () => {
      removeListener('beforeRemove', callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
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
        style={StyleSheet.compose(formStyle.container, styles.formContainer)}
        animation="slideInUp"
        ref={formRef}
        duration={200}>
        <RestorePasswordForm />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
  },
});
