import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { StyledPrimaryButton, StyledButtonText } from '../../style/button';
import colors from '../../utils/colors';
import * as Animatable from 'react-native-animatable';
import { Layout } from './components/layout';
import { Content } from '../../style/layouts';
import { AuthContext } from '../../context/auth';
import { RoutineHistory } from './routine/routineHistory';
import { useNavigation } from '@react-navigation/native';
import constants from '../../utils/constants';
import { showMessage } from 'react-native-flash-message';

const PrimaryButton = styled(StyledPrimaryButton)`
  width: 80%;
  align-self: center;
  background-color: ${colors.yellow_patito};
`;

const Button = (props) => (
  <PrimaryButton {...props}>
    <StyledButtonText numberOfLines={1}>
      Comenzar entrenamiento
    </StyledButtonText>
  </PrimaryButton>
);

export function WorkoutStarterScreen() {
  const {
    state: { user },
    updateUserInfo,
  } = useContext(AuthContext);

  const { navigate, addListener, removeListener } = useNavigation();

  useEffect(() => {
    addListener('focus', updateUserInfo);
    return () => {
      removeListener('focus', updateUserInfo);
    };
  }, []);

  return (
    <Layout text="Tus ultimos datos">
      <Content justifyContent="flex-end">
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <RoutineHistory />
        </View>
        <Animatable.View animation="bounceIn">
          <Button
            onPress={() => {
              if (user.isIdentified) {
                navigate(constants.SCREENS.WORKOUT_FLOW.ROUTINE_SELECTION);
              } else {
                showMessage({
                  message: 'Debes registrar tu entrada para poder entrenarte',
                  type: 'danger',
                });
              }
            }}
          />
        </Animatable.View>
      </Content>
    </Layout>
  );
}
