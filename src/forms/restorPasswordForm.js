import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { StyledButtonText, StyledPrimaryButton } from '../style/button';
import colors from '../utils/colors';
import { AuthContext } from '../context/auth';
import styled from 'styled-components/native';
import { ResponsiveSize } from './../utils/helpers';

const { width } = Dimensions.get('screen');

const Text = styled(StyledButtonText)`
  padding: 10px;
  font-size: ${(props) => ResponsiveSize(props.size ?? 24)}px;
`;

export function RestorePasswordForm({ callback }) {
  const {
    state: { token },
  } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    callback({ email, token });
  };

  return (
    <>
      <View style={style.inputWrapper}>
        <Text style={style.text} color={colors.white}>
          Email
        </Text>
        <TextInput
          style={style.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View>
        <StyledPrimaryButton title={'Reset Password'} onPress={onSubmit}>
          <Text size={18}>Reset Password</Text>
        </StyledPrimaryButton>
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
    color: colors.yellow_patito,
  },
  forgotText: {
    color: colors.yellow_patito,
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 15,
  },
});
