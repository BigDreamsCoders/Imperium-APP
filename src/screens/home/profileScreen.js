import React, { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../../context/auth';
import { Layout } from './components/layout';
import colors from '../../utils/colors';
import { dateParser, ResponsiveSize, timeFormater } from '../../utils/helpers';
import styled from 'styled-components/native';
import { useQuery } from 'react-query';
import { View, Text } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import { verifyToken } from '../../api/authentication';
import { Loader } from './../../components/loader';
import { useNavigation } from '@react-navigation/native';

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
  color: ${colors.yellow};
  font-family: 'Oswald-Bold';
`;

const SubTitle = styled.Text`
  font-size: ${ResponsiveSize(15)}px;
  font-family: 'Oswald-Bold';
  color: ${colors.yellow_patito};
  padding: 20px 0 0;
`;

const DataTitle = styled.Text`
  font-family: 'Oswald-Regular';
  font-size: ${ResponsiveSize(14)}px;
  color: ${colors.yellow};
`;

const Data = styled.Text`
  font-family: 'Oswald-Regular';
  font-size: ${ResponsiveSize(13)}px;
  color: ${colors.white};
`;
const Line = styled.Text`
  width: 100%;
  height: 0.7px;
  background-color: ${colors.yellow_patito};
`;

const Time = styled(TimeAgo)`
  color: ${colors.white};
`;

export function ProfileScreen() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const { addListener, removeListener } = useNavigation();

  const { data: user, isFetching, refetch, status } = useQuery(
    'get-user-profile-info',
    async () => {
      return await verifyToken(token);
    },
  );

  const totalTime = useMemo(() => {
    if (user) {
      const { history } = user;
      return history.reduce(
        (acc, { data }) => {
          return timeFormater(
            acc,
            data.reduce(
              (prev, { time }) => {
                console.log(prev);
                const [minStr, secStr] = time.split(':');
                try {
                  const min = parseInt(minStr, 10);
                  const sec = parseInt(secStr, 10);
                  return timeFormater(prev, [0, min, sec]);
                } catch (e) {
                  console.log(e);
                }
              },
              [0, 0, 0],
            ),
          );
        },
        [0, 0, 0],
      );
    }
    return [0, 0, 0];
  }, []);

  const totalCalories = useMemo(() => {
    if (user) {
      const { history } = user;
      return history.reduce((acc, { data }) => {
        return (
          acc +
          data.reduce((prev, { calories }) => {
            const caloriesNum = parseInt(calories, 10);
            return caloriesNum ? caloriesNum + prev : prev;
          }, 0)
        );
      }, 0);
    }
    return '';
  }, [user]);

  const dueData = useMemo(() => {
    return user
      ? moment(moment(user.createdAt).utc(false).toISOString())
          .utc(false)
          .add(1, 'M')
          .format('D MMMM, YYYY')
      : '';
  }, [user]);

  useEffect(() => {
    addListener('focus', refetch);
    return () => {
      removeListener('focus', refetch);
    };
  }, []);
  return (
    <Layout>
      {isFetching ? (
        <Loader color={colors.yellow_patito} />
      ) : (
        <ScrollView>
          <Profile>
            <View>
              <Title>{`${user.firstName} ${user.lastName}`}</Title>
              <Data>
                Miembro desde{' '}
                <Time time={dateParser(new Date(user.createdAt))} />
              </Data>
            </View>
            <View>
              <View>
                <SubTitle>Datos</SubTitle>
                <DataWrapper>
                  <DataTitle>Tipo de membresía</DataTitle>
                  <Data>{user.membership.membershipType.name}</Data>
                </DataWrapper>
                <Line />
                <DataWrapper>
                  <DataTitle>Costo</DataTitle>
                  <Data>${user.membership.membershipType.price}</Data>
                </DataWrapper>
                <Line />
                <DataWrapper>
                  <DataTitle>Próxima facturación</DataTitle>
                  <Data>{dueData}</Data>
                </DataWrapper>
              </View>
              <View>
                <SubTitle>Datos aeróbicos</SubTitle>
                <DataWrapper>
                  <DataTitle>Tiempo total</DataTitle>
                  <Data>{`${totalTime[0]}h ${totalTime[1]}m ${totalTime[2]}s`}</Data>
                </DataWrapper>
                <Line />
                <DataWrapper>
                  <DataTitle>Total de entrenamientos</DataTitle>
                  <Data>{user.history.length}</Data>
                </DataWrapper>
                <Line />
                <DataWrapper>
                  <DataTitle>Total calorías quemadas</DataTitle>
                  <Data>{totalCalories}</Data>
                </DataWrapper>
              </View>
            </View>
          </Profile>
        </ScrollView>
      )}
    </Layout>
  );
}
