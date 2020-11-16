import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import styled from 'styled-components/native';
import { getRoutines, toogleSaved } from '../../api/routine';
import { AuthContext } from '../../context/auth';
import colors from '../../utils/colors';
import { Layout } from './components/layout';
import { RoutineItem } from './components/routine/routineItem';
import {
  getUserRoutineHistory,
  userRoutines,
  userSavedRoutines,
} from '../../api/users';
import constants from '../../utils/constants';
import { FabButton } from '../../components/fabAnimation';
import { Container } from '../../style/layouts';
import { SharedElement } from 'react-navigation-shared-element';
import { FAB } from 'react-native-paper';

const Wrapper = styled(Container)`
  padding: 4px 0;
`;

const TextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function AllRoutines() {
  const {
    state: {
      token,
      user: { id },
    },
  } = useContext(AuthContext);
  const cache = useQueryCache();
  const navigation = useNavigation();
  const { isFetching, data, refetch } = useQuery(
    'get-all-routines',
    async () => {
      return await getRoutines(token);
    },
    { placeholderData: [] },
  );
  const [toggle] = useMutation(toogleSaved, {
    onSuccess: () => {
      cache.invalidateQueries('get-all-routines');
    },
  });
  useEffect(() => {
    navigation.addListener('focus', refetch);
    return () => {
      navigation.removeListener('beforeRemove', refetch);
    };
  }, []);

  return (
    <Wrapper>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            progressBackgroundColor={colors.yellow_patito}
          />
        }
        renderItem={({ item }) => {
          return (
            <RoutineItem
              item={item}
              id={id}
              onBookmarkPress={() => {
                toggle({ id: item.id, token });
              }}
            />
          );
        }}
      />
    </Wrapper>
  );
}

function SavedRoutines() {
  const {
    state: {
      token,
      user: { id },
    },
  } = useContext(AuthContext);
  const cache = useQueryCache();
  const navigation = useNavigation();
  const { isFetching, data, refetch } = useQuery(
    'get-saved-routines',
    async () => {
      return await userSavedRoutines(token);
    },
    { placeholderData: [] },
  );
  const [toggle] = useMutation(toogleSaved, {
    onSuccess: () => {
      cache.invalidateQueries('get-saved-routines');
    },
  });

  useEffect(() => {
    navigation.addListener('focus', refetch);
    return () => {
      navigation.removeListener('beforeRemove', refetch);
    };
  }, []);

  return (
    <Wrapper>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            progressBackgroundColor={colors.yellow_patito}
          />
        }
        renderItem={({ item }) => {
          return (
            <RoutineItem
              item={{ ...item, saved: true }}
              id={id}
              onBookmarkPress={() => {
                toggle({ id: item.id, token });
              }}
            />
          );
        }}
      />
    </Wrapper>
  );
}

function MyRoutines() {
  const {
    state: {
      token,
      user: { id },
    },
  } = useContext(AuthContext);
  const cache = useQueryCache();
  const navigation = useNavigation();
  const { isFetching, data, refetch } = useQuery(
    'get-my-routines',
    async () => {
      return await userRoutines(token);
    },
    { placeholderData: [] },
  );
  const [toggle] = useMutation(toogleSaved, {
    onSuccess: () => {
      cache.invalidateQueries('get-my-routines');
    },
  });

  useEffect(() => {
    navigation.addListener('focus', refetch);
    return () => {
      navigation.removeListener('beforeRemove', refetch);
    };
  }, []);

  return (
    <Wrapper>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            progressBackgroundColor={colors.yellow_patito}
          />
        }
        style={{ backgroundColor: colors.royal_blue }}
        renderItem={({ item }) => {
          return (
            <RoutineItem
              item={item}
              id={id}
              onBookmarkPress={() => {
                toggle({ id: item.id, token });
              }}
            />
          );
        }}
      />
    </Wrapper>
  );
}

function RoutineHistory() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const { isFetching, data, refetch } = useQuery(
    'get-routine-history',
    async () => {
      return await getUserRoutineHistory(token);
    },
    { placeholderData: [] },
  );

  useEffect(() => {
    navigation.addListener('focus', refetch);
    return () => {
      navigation.removeListener('beforeRemove', refetch);
    };
  }, []);
  return (
    <Wrapper>
      {data.length === 0 ? (
        <TextWrapper>
          <Text
            style={{
              color: colors.yellow_patito,
              fontSize: 40,
              alignSelf: 'center',
            }}>
            Aun no has hecho rutinas
          </Text>
        </TextWrapper>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              progressBackgroundColor={colors.yellow_patito}
            />
          }
          renderItem={({ item }) => {
            const { id } = item;
            return <RoutineItem history={item} item={item.routine} id={id} />;
          }}
        />
      )}
    </Wrapper>
  );
}

const Tab = createMaterialTopTabNavigator();

export function RoutineScreen({ navigation }) {
  return (
    <Layout>
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
        <Tab.Screen name="Todos" component={AllRoutines} />
        <Tab.Screen name="Guardados" component={SavedRoutines} />
        <Tab.Screen name="Creadas por mi" component={MyRoutines} />
        <Tab.Screen name="Mi historial" component={RoutineHistory} />
      </Tab.Navigator>
      <FabButton
        onPress={() => {
          navigation.navigate(constants.SCREENS.ROUTINE.NEWROUTINE);
        }}
        render={(cb) => {
          return (
            <SharedElement id="fab" style={style.sharedElement}>
              <FAB icon="plus" style={style.fab} onPress={cb} />
            </SharedElement>
          );
        }}
      />
    </Layout>
  );
}

const style = StyleSheet.create({
  sharedElement: {
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    marginRight: 8,
    backgroundColor: colors.yellow_patito,
    color: colors.royal_blue,
    zIndex: 10,
  },
});
