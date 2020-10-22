import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {login} from '../api/authentication';
import EmailForm from '../forms/loginForm';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
          <EmailForm
            buttonText="Sign in"
            onSubmit={login}
            onAuthentication={() => navigation.navigate('Home')}>
            {/* <Button
          title="Create account"
          onPress={() => navigation.navigate('CreateAccount')}
        /> */}
            {/* <Text
              style={styles.forgotText}
              onPress={() => navigation.navigate('CreateAccount')}>
              Don't have an account yet?
            </Text> */}
          </EmailForm>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:"center",
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
