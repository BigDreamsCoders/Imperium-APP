import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../context/auth';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder={'Email'}
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        placeholder={'Password'}
        style={styles.input}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        //secureTextEntry
      />
      <Text style={styles.forgotText}>Forgot your password?</Text>
      <Button title={buttonText} onPress={submit} color={'#F5D061'} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //alignSelf:"flex-end",
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 25,
    height: 350,
    //backgroundColor:"green",
    marginTop: 100,
  },
  input: {
    height: 40,
    width: 275,
    borderColor: '#BFBFBF',
    borderWidth: 0.75,
    paddingHorizontal: 10,
  },
  text: {
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  forgotText: {
    color: '#1890FF',
    alignSelf: 'flex-start',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default EmailForm;
