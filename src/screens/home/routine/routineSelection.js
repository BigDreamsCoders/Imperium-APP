import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { getRoutines } from '../../../api/routine';
import { getUserRoutineHistory, userSavedRoutines } from '../../../api/users';
import { AuthContext } from '../../../context/auth';
import { Container } from '../../../style/layouts';
import colors from '../../../utils/colors';
import constants from '../../../utils/constants';
import { dateParser } from '../../../utils/helpers';
import { Time, TimeText, TimeTextWrapper } from '../components/routineItem';

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.royal_blue};
`;

const IconCloseWrap = styled.View`
  align-self: flex-start;
  top: 10px;
  left: 10px;
  background-color: ${colors.yellow_patito}90;
  border-radius: 30px;
  margin: 10px 0px;
`;

const Title = styled.Text`
  color: ${colors.white};
  font-size: 38px;
  margin: ${(props) => props.margin ?? 20}px;
  text-align: justify;
  font-family: 'Oswald-Regular';
`;

const TabContainer = styled(Container)`
  padding: 4px 0;
`;

const Card = styled.TouchableOpacity`
  width: 95%;
  height: 100px;
  align-self: center;
  margin: 5px 0px;
  border-radius: 5px;
  background-color: ${colors.royal_blue_light};
`;

const Message = styled.Text`
  color: ${colors.yellow_patito};
  font-size: 38px;
`;

function SavedRoutines() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { params } = useRoute();
  const { addListener, removeListener } = useNavigation();
  const { data, refetch } = useQuery(
    'get-saved-routines',
    async () => {
      return await userSavedRoutines(token);
    },
    { placeholderData: [] },
  );
  useEffect(() => {
    addListener('focus', refetch);
    return () => {
      removeListener('focus', refetch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TabContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Card
              onPress={() => {
                params.navigateCallback(item.id);
              }}>
              <Title>{item.name}</Title>
            </Card>
          );
        }}
      />
    </TabContainer>
  );
}

function AllRoutines() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { params } = useRoute();
  const { addListener, removeListener } = useNavigation();
  const {
    data: { data },
    refetch,
  } = useQuery(
    'get-all-routines',
    async () => {
      return await getRoutines(token);
    },
    { placeholderData: [] },
  );
  useEffect(() => {
    addListener('focus', refetch);
    return () => {
      removeListener('focus', refetch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Card
              onPress={() => {
                params.navigateCallback(item.id);
              }}>
              <Title>{item.name}</Title>
            </Card>
          );
        }}
      />
    </TabContainer>
  );
}

function RoutineHistory() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { params } = useRoute();
  const { addListener, removeListener } = useNavigation();
  const { data, refetch } = useQuery(
    'get-routine-history',
    async () => {
      return await getUserRoutineHistory(token);
    },
    { placeholderData: [] },
  );

  useEffect(() => {
    addListener('focus', refetch);
    return () => {
      removeListener('focus', refetch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabContainer>
      {data.length === 0 ? (
        <Container style={styles.center}>
          <Message>Aun no has hecho rutinas</Message>
        </Container>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const { createdAt, routine } = item;
            return (
              <Card
                onPress={() => {
                  params.navigateCallback(routine.id);
                }}>
                <Title color={colors.white}>{routine.name}</Title>
                <>
                  <TimeTextWrapper>
                    <TimeText> Hecha </TimeText>

                    <Time time={dateParser(createdAt)} />
                  </TimeTextWrapper>
                </>
              </Card>
            );
          }}
        />
      )}
    </TabContainer>
  );
}

const Tab = createMaterialTopTabNavigator();

export function RoutineSelection() {
  const { goBack, navigate } = useNavigation();
  const startRoutine = (id) => {
    navigate(constants.SCREENS.WORKOUT_FLOW.ROUTINE_MANAGER, {
      routineId: id,
    });
  };

  return (
    <Wrapper>
      <IconCloseWrap>
        <Icon
          name="close"
          type="matirial-community"
          size={32}
          color={colors.royal_blue}
          onPress={() => {
            goBack();
          }}
        />
      </IconCloseWrap>
      <Title>Escoge la rutina</Title>
      <Tab.Navigator
        style={{ backgroundColor: colors.royal_blue }}
        sceneContainerStyle={{ backgroundColor: colors.royal_blue }}
        tabBarOptions={{
          bounces: true,
          style: { backgroundColor: colors.royal_blue, paddingTop: 40 },
          activeTintColor: colors.yellow_patito,
          inactiveTintColor: colors.yellow,
          labelStyle: { textTransform: 'none' },
          indicatorStyle: {
            backgroundColor: colors.yellow_patito,
            zIndex: 30,
          },
        }}>
        <Tab.Screen
          name="SELECT_ROUTINE_HISTORY"
          options={{ tabBarLabel: 'Historial' }}
          component={RoutineHistory}
          initialParams={{
            navigateCallback: (id) => {
              startRoutine(id);
            },
          }}
        />
        <Tab.Screen
          name="SELECT_ALL_ROUTINES"
          options={{ tabBarLabel: 'Todas' }}
          component={AllRoutines}
          initialParams={{
            navigateCallback: (id) => {
              startRoutine(id);
            },
          }}
        />
        <Tab.Screen
          name="SELECT_SAVED_ROUTINES"
          options={{ tabBarLabel: 'Guardadas' }}
          component={SavedRoutines}
          initialParams={{
            navigateCallback: (id) => {
              startRoutine(id);
            },
          }}
        />
      </Tab.Navigator>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
});
