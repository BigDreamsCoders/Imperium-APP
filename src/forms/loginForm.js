import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { AuthContext } from '../context/auth';
import { Button, StyledButtonText, StyledPrimaryButton } from '../style/button';
import colors from '../utils/colors';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import constants from '../utils/constants';
import { formStyle } from './../style/form';
import { SharedElement } from 'react-navigation-shared-element';
import { login as onSubmit } from '../api/authentication';
import { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

const LoginButton = styled(Button)`
  background-color: ${colors.yellow_patito};
`;

const LoginForm = ({ buttonText, onForgot }) => {
  const {
    state: { token },
    login,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    try {
      const data = await onSubmit({ email, password }, token);
      login({ token: data.token });
    } catch (e) {
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
    }
  };

  return (
    <>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={styles.buttons}>
        <LoginButton onPress={submit}>
          <StyledButtonText>{buttonText}</StyledButtonText>
        </LoginButton>
        <TouchableWithoutFeedback
          style={styles.forgotText}
          onPress={async () => {
            await onForgot();
            navigation.push(constants.SCREENS.FORGOT);
          }}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableWithoutFeedback>
      </View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 20,
    width: width,
  },
  input: {
    height: 40,
    borderColor: colors.yellow_patito,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: colors.yellow_patito,
  },
  text: {
    color: colors.white,
    padding: 10,
    fontSize: 24,
  },
  buttons: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotText: {
    color: colors.yellow_patito,
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 15,
  },
});

export default LoginForm;
