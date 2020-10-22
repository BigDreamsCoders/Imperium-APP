import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import {createAccount} from '../api/mock';
import EmailForm from '../forms/createAccountForm';

const CreateAccount = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <EmailForm
          buttonText="Sign up"
          onSubmit={createAccount}
          onAuthentication={() => navigation.navigate('Home')}>
          <Button
            title="Back to log in"
            onPress={() => navigation.navigate('Login')}
          />
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

export default CreateAccount;
