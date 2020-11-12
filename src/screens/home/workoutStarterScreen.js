import React from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { StyledPrimaryButton, StyledButtonText } from '../../style/button';
import colors from '../../utils/colors';
import * as Animatable from 'react-native-animatable';
import { ResumeList } from './components/recentData/list';
import { Layout } from './components/layout';
import { Content } from '../../style/layouts';

const PrimaryButton = styled(StyledPrimaryButton)`
  width: 80%;
  align-self: center;
  background-color: ${colors.yellow_patito};
`;

const Button = () => (
  <PrimaryButton>
    <StyledButtonText style={style.buttonText} numberOfLines={1}>
      Comenzar entrenamiento
    </StyledButtonText>
  </PrimaryButton>
);

export function WorkoutStarterScreen() {
  return (
    <Layout text="Tus ultimos datos">
      <Content>
        <View>
          <ResumeList />
        </View>
        <Animatable.View animation="bounceIn">
          <Button />
        </Animatable.View>
      </Content>
    </Layout>
  );
}

const style = StyleSheet.create({
  buttonText: {
    fontSize: 24,
  },
});
