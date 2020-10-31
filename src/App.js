import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { AuthWrapper } from './wrapper/Auth';
import { AuthContext } from './context/auth';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import { DetailScreen } from './screens/detail';
import { Loading } from './screens/loadingSreen';

const Stack = createSharedElementStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <AuthWrapper>
        <NavigatorWrapper />
      </AuthWrapper>
    </NavigationContainer>
  );
}

export function NavigatorWrapper() {
  const {
    state: { token },
  } = useContext(AuthContext);
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
      {token ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            sharedElements={(route, otherRoute, showing) => {
              const { id } = route.params;
              return [
                { id: `photo.${id}`, animation: 'move' },
                { id: `text.${id}`, animation: 'fade-out', resize: 'none' },
              ];
            }}
            options={{ animationTypeForReplace: 'push' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={Loading} />
          <Stack.Screen
            name="Login"
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
        </>
      )}
    </Stack.Navigator>
  );
}
