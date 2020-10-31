import React, { useContext, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { PrimaryButton } from '../style/button';
import { formStyle } from '../style/form';
import colors from '../utils/colors';
import { restorePassword } from '../api/users';
import { AuthContext } from '../context/auth';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('screen');

export function RestorePasswordForm() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);

  const onSubmit = async (email) => {
    try {
      await restorePassword(email, token);
    } catch (e) {
      showMessage({
        message: 'Usuario no encontrado',
        type: 'danger',
      });
    }
  };

  return (
    <>
      <View style={style.inputWrapper}>
        <Text style={style.text}>Email</Text>
        <TextInput
          style={style.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <PrimaryButton title={'Reset Password'} onPress={onSubmit} />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 2,
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
    marginTop: 15,
  },
});
