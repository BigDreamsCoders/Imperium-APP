import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { tabNavigationItems } from '../../navigators/tabItems';
import colors from '../../utils/colors';
import { StyleSheet } from 'react-native';
import constants from '../../utils/constants';
import { NewRoutineScreen } from './routine/newRoutine';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Tab = createMaterialBottomTabNavigator();

function HomeTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName={tabNavigationItems[0].name}
      inactiveColor={colors.yellow_patito}
      activeColor={colors.yellow}
      barStyle={style.bar}
      style={{ backgroundColor: colors.royal_blue }}
      shifting={true}>
      {tabNavigationItems.map((item) => {
        return <Tab.Screen key={item.name} {...item} />;
      })}
    </Tab.Navigator>
  );
}

const RootStack = createSharedElementStackNavigator();

const opacityTransition = {
  useNativeDriver: true,
  gestureDirection: 'horizontal', // we will swipe right if we want to close the screen;
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    }, // updates the opacity depending on the transition progress value of the current screen
  }),
};

export function HomeScreen() {
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{ ...opacityTransition }}
      initialRouteName={constants.SCREENS.HOME.HOME_TAB}>
      <RootStack.Screen
        name={constants.SCREENS.HOME.HOME_TAB}
        component={HomeTabScreen}
        sharedElements={() => {
          return [{ id: 'fab', animation: 'fade' }];
        }}
      />
      <RootStack.Screen
        name={constants.SCREENS.ROUTINE.NEWROUTINE}
        component={NewRoutineScreen}
        sharedElements={(route, otherRoute, showing) => {
          return ['fab'];
        }}
      />
    </RootStack.Navigator>
  );
}

const style = StyleSheet.create({
  bar: {
    backgroundColor: colors.royal_blue_light,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
  },
});
