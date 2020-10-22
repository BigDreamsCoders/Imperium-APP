import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, Button, Text, View} from 'react-native';
import {setToken} from '../api/token';

const CreateAccountForm = ({buttonText, onSubmit, children, onAuthentication}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    onSubmit(email, password)
      .then(async (res) => {
        await setToken(res.auth_token);
        onAuthentication();
      })
      .catch((res) => {
        if (res && res.error) {
          setErrorMessage(res.error);
        }

        setErrorMessage('Algo salio mal.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput
        placeholder={"Nombre"}
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        //keyboardType="email-address"
      />
            <Text style={styles.text}>Apellido</Text>
      <TextInput
        placeholder={"Apellido"}
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        //keyboardType="email-address"
      />
            <Text style={styles.text}>Genero</Text>
      <TextInput
        placeholder={"Genero"}
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
      />
            <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder={"Email"}
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
      />
                 <Text style={styles.text}>Fecha de nacimiento</Text>
      <TextInput
        placeholder={"Email"}
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <Button title={buttonText} onPress={submit} color={"#F5D061"} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //alignSelf:"flex-end",
    justifyContent: 'center',
    backgroundColor:"white",
    borderRadius:10,
    paddingHorizontal:25,
    height:500,
    //backgroundColor:"green",
    marginTop:50,

  },
  input: {
    height: 40,
    width: 275,
    borderColor: '#BFBFBF',
    borderWidth: 0.75,
    paddingHorizontal:10,
    marginBottom: 15
  },
  text:{
    color:"black",
    alignSelf:"flex-start",
      },
  forgotText:{
    color:"#1890FF",
    alignSelf:"flex-start",
    fontSize:12,
    marginBottom:10
  }
});

export default CreateAccountForm;