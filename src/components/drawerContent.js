import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { DrawerContent } from '@react-navigation/drawer';
import { StyledButtonText, StyledPrimaryButton } from '../style/button';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import colors from '../utils/colors';
import { AuthContext } from '../context/auth';
import { ResponsiveSize } from '../utils/helpers';

const StyledImage = styled.Image`
  flex: 1;
  width: 90%;
  height: 200px;
`;

const ImageWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 230px;
`;

const LogoutButton = styled(StyledPrimaryButton)`
  flex-direction: row;
  justify-content: flex-start;
  align-self: center;
  width: 90%;
  margin: 20px 0;
  border-radius: 4px;
  background-color: ${colors.red};
`;

const LogoutText = styled(StyledButtonText)`
  color: ${colors.white};
  font-size: 24px;
`;

export function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageWrapper>
        <StyledImage
          source={require('./../assets/logo.png')}
          style={style.image}
        />
      </ImageWrapper>
      <ScrollView>
        <DrawerContent {...props} />
      </ScrollView>
      <LogoutButton onPress={logout}>
        <MaterialIcons
          name="logout"
          size={ResponsiveSize(14)}
          color={colors.white}
        />
        <LogoutText>Logout</LogoutText>
      </LogoutButton>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});
