import React, { useContext } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AuthContext } from '../context/auth';
import { DetailScreen } from '../screens/detail';
import { ForgotScreen } from '../screens/forgotPasswordScreen';
import { HomeScreen } from '../screens/homeScreen';
import { Loading } from '../screens/loadingSreen';
import { LoginScreen } from '../screens/loginScreen';
import constants from '../utils/constants';
import colors from '../utils/colors';
import { Icon } from 'react-native-elements';

const Tab = createMaterialBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

export function NavigatorWrapper() {
  const {
    state: { token },
  } = useContext(AuthContext);
  if (token) {
    return (
      <Tab.Navigator
        inactiveColor={colors.yellow_patito}
        activeColor={colors.yellow}
        barStyle={{ backgroundColor: colors.royal_blue, elevation: 50 }}>
        <Tab.Screen
          name={constants.SCREENS.HOME}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Icon
                  name="home"
                  type="antdesign"
                  color={focused ? colors.yellow : colors.yellow_patito}
                />
              );
            },
          }}
        />
        <Tab.Screen name="Detail" component={DetailScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator
      headerMode={'none'}
      screenOptions={{
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      }}>
      <Stack.Screen name={constants.SCREENS.SPLASH} component={Loading} />
      <Stack.Screen
        name={constants.SCREENS.LOGIN}
        component={LoginScreen}
        sharedElements={(route, otherRoute, showing) => {
          return [{ id: 'logo', animation: 'move' }];
        }}
        options={{
          animationTypeForReplace: 'push',
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: 1,
              },
            };
          },
        }}
      />
      <Stack.Screen
        name={constants.SCREENS.FORGOT}
        component={ForgotScreen}
        sharedElements={(route, otherRoute, showing) => {
          return [{ id: 'logo', animation: 'move' }];
        }}
        options={{
          animationTypeForReplace: 'push',
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: 1,
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
}
