import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { getUserRoutineHistory } from '../../../api/users';
import { AuthContext } from '../../../context/auth';
import colors from '../../../utils/colors';
import { addToObject, ResponsiveSize } from '../../../utils/helpers';
import { Loader } from './../../../components/loader';

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

  const { addListener, removeListener } = useNavigation();

  const { data, isFetching, refetch, isFetched } = useQuery(
    'get-initial-history',
    async () => {
      return await getUserRoutineHistory(token);
    },
  );

  useEffect(() => {
    addListener('focus', refetch);
    () => {
      removeListener('focus', refetch);
    };
  }, []);

  const lastRoutine = useMemo(() => {
    if (data) {
      const routine = [...data].pop();
      return {
        routine: routine?.routine,
        date: routine?.createdAt,
      };
    }
    return undefined;
  }, [data]);

  const favoriteWorkstation = useMemo(() => {
    if (data) {
      const occurrences = data.reduce((acc, { routine }, index) => {
        return {
          ...routine.workstation.reduce(
            (prev, { name }) => addToObject(prev, name),
            acc,
          ),
        };
      }, {});
      const favorite = Object.keys(occurrences).sort((a, b) => {
        return occurrences[b] - occurrences[a];
      })[0];
      return {
        name: favorite,
        count: occurrences[favorite],
      };
    }
  }, [data]);

  const favoriteRoutine = useMemo(() => {
    if (data) {
      const occurrences = data.reduce((prev, { routine }) => {
        return addToObject(prev, routine.name);
      }, {});
      const favorite = Object.keys(occurrences).sort((a, b) => {
        return occurrences[b] - occurrences[a];
      })[0];
      return {
        name: favorite,
        count: occurrences[favorite],
      };
    }
  }, [data]);

  if (data && data.length === 0) {
    return <NoHistory />;
  }

  return (
    <Wrapper
      justifyContent={isFetching ? 'center' : null}
      alignItems={isFetching ? 'center' : null}>
      {isFetching ? (
        <Loader color={colors.yellow_patito} />
      ) : (
        <LastRoutineWrapper>
          <SectionWrapper>
            <Title>Tu ultima rutina</Title>
            <TextWrapper>
              <Value>{lastRoutine?.routine?.name}</Value>
              <Value>
                {moment(moment(lastRoutine?.createdAt).utc(true).toISOString())
                  .utc(false)
                  .format('DD/MM/YYYY')}
              </Value>
            </TextWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <Title>Tu maquina favorita</Title>
            <TextWrapper>
              <Value>{favoriteWorkstation.name}</Value>
              <Value>Usada {favoriteWorkstation.count} veces</Value>
            </TextWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <Title>Tu rutina favorita</Title>
            <TextWrapper>
              <Value>{favoriteRoutine.name}</Value>
              <Value>{favoriteRoutine.count}</Value>
            </TextWrapper>
          </SectionWrapper>
        </LastRoutineWrapper>
      )}
    </Wrapper>
  );
}
