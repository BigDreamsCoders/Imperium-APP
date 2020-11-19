import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, StyledButtonText } from '../style/button';
import colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import constants from '../utils/constants';
import styled from 'styled-components/native';
import { ResponsiveSize } from '../utils/helpers';

const { width } = Dimensions.get('screen');

const LoginButton = styled(Button)`
  background-color: ${colors.yellow_patito};
`;

const Text = styled(StyledButtonText)`
  padding: 10px;
  font-size: ${ResponsiveSize(24)}px;
`;

const LoginForm = ({ buttonText, onForgot, onSubmit }) => {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const submit = () => {
    onSubmit({ email, password });
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
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 20,
    width,
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
