import React, { useContext } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/auth';
import { authNavigationItems, mainNavigationItems } from './items';
import { CustomDrawerContent } from '../components/drawerContent';
import colors from '../utils/colors';

const Stack = createSharedElementStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{ backgroundColor: colors.royal_blue_light }}
      drawerContentOptions={{
        activeTintColor: colors.yellow,
        inactiveTintColor: colors.yellow_patito,
      }}>
      {mainNavigationItems.map((item) => {
        return <Drawer.Screen key={item.name} {...item} />;
      })}
    </Drawer.Navigator>
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
