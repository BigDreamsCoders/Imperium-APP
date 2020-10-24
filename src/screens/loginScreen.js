import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { login } from '../api/authentication';
import EmailForm from '../forms/loginForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <EmailForm buttonText="Sign in" onSubmit={login} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    //backgroundColor:"red"
    //paddingVertical:100
  },
  forgotText: {
    color: '#1890FF',
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
  },
});

export default LoginScreen;
