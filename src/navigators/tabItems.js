import React from 'react';
import { ProfileScreen } from '../screens/home/profileScreen';
import { WorkoutStarterScreen } from '../screens/home/workoutStarterScreen';
import colors from '../utils/colors';
import constants from '../utils/constants';
import { Icon } from 'react-native-elements';
import { RoutineScreen } from '../screens/home/routineScreen';

export const tabNavigationItems = [
  {
    name: constants.SCREENS.WORKOUT_STARTER,
    component: WorkoutStarterScreen,
    options: {
      tabBarLabel: 'Entrenamiento',
      tabBarIcon: () => {
        return (
          <Icon
            name="timer"
            type="material-community"
            size={24}
            color={colors.yellow_patito}
          />
        );
      },
    },
  },
  {
    name: constants.SCREENS.ROUTINE.ROUTINES,
    component: RoutineScreen,
    options: {
      tabBarLabel: 'Rutinas',
      tabBarIcon: () => {
        return (
          <Icon
            name="run"
            type="material-community"
            size={24}
            color={colors.yellow_patito}
          />
        );
      },
    },
  },
  {
    name: constants.SCREENS.PROFILE,
    component: ProfileScreen,
    options: {
      tabBarLabel: 'Perfil',
      tabBarIcon: () => {
        return (
          <Icon
            name="user"
            type="antdesign"
            size={24}
            color={colors.yellow_patito}
          />
        );
      },
    },
  },
];
