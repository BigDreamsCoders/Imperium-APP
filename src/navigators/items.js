import { HomeScreen } from '../screens/home/homeScreen';
import { SplashScreen } from '../screens/splashSreen';
import { LoginScreen } from '../screens/loginScreen';
import { ForgotScreen } from '../screens/forgotPasswordScreen';
import { DetailScreen } from '../screens/detail';
import constants from '../utils/constants';

export const mainNavigationItems = [
  {
    name: constants.SCREENS.HOME.HOME,
    component: HomeScreen,
  },
  {
    name: constants.SCREENS.TEST,
    component: DetailScreen,
  },
];

export const authNavigationItems = [
  {
    name: constants.SCREENS.SPLASH,
    component: SplashScreen,
  },
  {
    name: constants.SCREENS.LOGIN,
    component: LoginScreen,
    sharedElements: () => {
      return [{ id: 'logo', animation: 'move' }];
    },
    options: {
      animationTypeForReplace: 'push',
      cardStyleInterpolator: () => {
        return {
          cardStyle: {
            opacity: 1,
          },
        };
      },
    },
  },
  {
    name: constants.SCREENS.FORGOT,
    component: ForgotScreen,
    sharedElements: () => {
      return [{ id: 'logo', animation: 'move' }];
    },
    options: {
      animationTypeForReplace: 'push',
      cardStyleInterpolator: () => {
        return {
          cardStyle: {
            opacity: 1,
          },
        };
      },
    },
  },
];
