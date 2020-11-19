import React, { useContext, useEffect } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/auth';
import { authNavigationItems, mainNavigationItems } from './items';
import { CustomDrawerContent } from '../components/drawerContent';
import colors from '../utils/colors';
import styled from 'styled-components/native';
import { Loader } from '../components/loader';
import { Header } from '../components/header';
import { StatusBar } from 'react-native';
import { useQuery } from 'react-query';

const Stack = createSharedElementStackNavigator();
const Drawer = createDrawerNavigator();

const routes = (role) => {
  const canRenderQRReader = role.privilege.filter((p) => {
    return p.id === 8;
  });
  const navigator = [...mainNavigationItems];
  if (canRenderQRReader.length === 0) {
    navigator.pop();
  }
  return navigator.map((item) => <Drawer.Screen key={item.name} {...item} />);
};

const Loading = styled.View`
  flex: 1;
  background-color: ${colors.royal_blue};
`;

function MainNavigator() {
  const { state, updateUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!state.user) {
      updateUserInfo();
    }
  }, []);

  return (
    <>
      {!state.user ? (
        <Loading>
          <StatusBar backgroundColor={colors.royal_blue} />
          <Loader color={colors.yellow_patito} />
        </Loading>
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerStyle={{ backgroundColor: colors.royal_blue_light }}
          drawerContentOptions={{
            activeTintColor: colors.yellow,
            inactiveTintColor: colors.yellow_patito,
          }}>
          {routes(state.user.role)}
        </Drawer.Navigator>
      )}
    </>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
        headerStyle: {
          backgroundColor: colors.royal_blue,
        },
        headerTintColor: colors.white,
      }}>
      {authNavigationItems.map((item) => {
        return <Stack.Screen key={item.name} {...item} />;
      })}
    </Stack.Navigator>
  );
}

export function NavigatorWrapper() {
  const {
    state: { token },
  } = useContext(AuthContext);

  if (token) {
    return <MainNavigator />;
  } else {
    return <AuthNavigator />;
  }
}
