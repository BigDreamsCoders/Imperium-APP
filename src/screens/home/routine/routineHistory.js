import React, { useContext } from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { getUserRoutineHistory } from '../../../api/users';
import { AuthContext } from '../../../context/auth';
import colors from '../../../utils/colors';
import { ResponsiveSize } from '../../../utils/helpers';

const Wrapper = styled.View`
  background-color: ${colors.royal_blue_light};
  width: 80%;
  height: 80%;
  margin-bottom: 10px;
  border-radius: 8px;
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};
  align-items: ${(props) => props.alignItems ?? 'flex-start'};
`;

const LastRoutineWrapper = styled.View`
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 0 20px;
`;

const Title = styled.Text`
  width: 100%;
  font-size: ${ResponsiveSize(18)}px;
  font-weight: bold;
  color: ${colors.yellow_patito};
  text-align: center;
`;

const Value = styled.Text`
  color: ${colors.white};
  font-size: ${ResponsiveSize(12)}px;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const SectionWrapper = styled.View`
  width: 100%;
  margin: 10% 0;
`;

function NoHistory() {
  return (
    <Wrapper justifyContent="center">
      <Title allowFontScaling>
        Aquí encontraras un resumen de tu actividad
      </Title>
    </Wrapper>
  );
}

export function RoutineHistory() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const { data } = useQuery(
    'get-history',
    async () => {
      return await getUserRoutineHistory(token);
    },
    { initialData: [] },
  );

  // if (data.length === 0) {
  //   return <NoHistory />;
  // } 

  return (
    <Wrapper>
      <LastRoutineWrapper>
        <SectionWrapper>
          <Title>Tu ultima rutina</Title>
          <TextWrapper>
            <Value>El nombre de la rutina</Value>
            <Value> x</Value>
          </TextWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>Resumen semanal</Title>
          <TextWrapper>
            <Value>El nombre de la rutina</Value>
            <Value> x</Value>
          </TextWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>Tu maquina favorita</Title>
          <TextWrapper>
            <Value>El nombre de la rutina</Value>
            <Value> x</Value>
          </TextWrapper>
        </SectionWrapper>
      </LastRoutineWrapper>
    </Wrapper>
  );
}
