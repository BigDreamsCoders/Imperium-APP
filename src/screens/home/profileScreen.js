import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Layout } from './components/layout';
import colors from '../../utils/colors';
import { ResponsiveSize } from '../../utils/helpers';
import styled from 'styled-components/native';
// import { useQuery } from 'react-query';
import { View, Text } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = styled.View`
  flex-direction: column;
  padding: 20px;
`;

const DataWrapper = styled.View`
  flex-direction: column;
  padding: 10px 0px;
`;

const Title = styled.Text`
  font-size: ${ResponsiveSize(20)}px;
  font-weight: bold;
  color: ${colors.yellow};
`;

const SubTitle = styled.Text`
  font-size: ${ResponsiveSize(15)}px;
  font-weight: bold;
  color: ${colors.yellow_patito};
  padding: 20px 0 0;
`;

const DataTitle = styled.Text`
  font-size: ${ResponsiveSize(14)}px;
  color: ${colors.yellow};
`;

const Data = styled.Text`
  font-size: ${ResponsiveSize(13)}px;
  color: ${colors.white};
`;
const Line = styled.Text`
  width: 100%;
  height: 0.7px;
  background-color: ${colors.yellow_patito};
`;

export function ProfileScreen() {
  const {
    state: { user },
  } = useContext(AuthContext);
  console.log(user);
  return (
    <Layout>
      <ScrollView>
        <Profile>
          <View>
            <Title>Andres Quijada</Title>
            <Data>Miembro desde 2019</Data>
            <Data>San Salvador</Data>
          </View>
          <View>
            <View>
              <SubTitle>Datos</SubTitle>
              <DataWrapper>
                <DataTitle>Tipo de membresía</DataTitle>
                <Data>Premium xxx</Data>
              </DataWrapper>
              <Line />
              <DataWrapper>
                <DataTitle>costo</DataTitle>
                <Data>$49.99</Data>
              </DataWrapper>
              <Line />
              <DataWrapper>
                <DataTitle>Fecha de vencimiento</DataTitle>
                <Data>29 de abril de 2021</Data>
              </DataWrapper>
            </View>
            <View>
              <SubTitle>Datos aerobicos</SubTitle>
              <DataWrapper>
                <DataTitle>Tiempo total</DataTitle>
                <Data>3 h 35 min 35 s</Data>
              </DataWrapper>
              <Line />
              <DataWrapper>
                <DataTitle>Total de entrenamientos</DataTitle>
                <Data>5</Data>
              </DataWrapper>
              <Line />
              <DataWrapper>
                <DataTitle>Total calorias quemadas</DataTitle>
                <Data>3,751</Data>
              </DataWrapper>
            </View>
          </View>
        </Profile>
      </ScrollView>
    </Layout>
  );
}
