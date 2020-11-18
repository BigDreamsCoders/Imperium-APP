import { HomeScreen } from '../screens/home/homeScreen';
import { SplashScreen } from '../screens/splashSreen';
import { LoginScreen } from '../screens/loginScreen';
import { ForgotScreen } from '../screens/forgotPasswordScreen';
import { QRScreen, ScanQRScreen } from '../screens/qrScreen';
import constants from '../utils/constants';

export const mainNavigationItems = [
  {
    name: constants.SCREENS.HOME.HOME,
    component: HomeScreen,
    options: {
      drawerLabel: 'Mi Imperio',
    },
  },
  {
    name: constants.SCREENS.QR,
    component: QRScreen,
    options: {
      drawerLabel: 'Mi QR',
    },
  },
  {
    name: constants.SCREENS.SCAN_QR,
    component: ScanQRScreen,
    options: {
      drawerLabel: 'Leer QR',
    },
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
