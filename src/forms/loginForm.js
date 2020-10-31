import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../context/auth';
import * as Animatable from 'react-native-animatable';
import colors from '../utils/colors';
import { BlueButton, PrimaryButton } from '../style/button';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const EmailForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
  const {
    state: { token },
    login,
  } = useContext(AuthContext);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    try {
      const data = await onSubmit({ email, password }, token);
      login({ token: data.token });
    } catch (e) {
      if (e?.response?.data) {
        switch (e.response.data.statusCode) {
          case 401: {
            setErrorMessage('Credenciales incorrectas');
            break;
          }
          default: {
            setErrorMessage('Algo salió mal');
            break;
          }
        }
      }
    }
  };

  return (
    <Animatable.View
      style={styles.container}
      animation="slideInUp"
      duration={200}>
      <SafeAreaView />
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
          //secureTextEntry
        />
      </View>
      <View>
        <PrimaryButton title={buttonText} onPress={submit} />
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    backgroundColor: colors.royal_blue_light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 25,
  },
  inputWrapper: {
    padding: 20,
    width: width,
  },
  input: {
    height: 40,
    borderColor: colors.yellow_patito,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.white,
    padding: 10,
    fontSize: 24,
  },
  forgotText: {
    color: colors.yellow_patito,
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
  },
});

export default EmailForm;
