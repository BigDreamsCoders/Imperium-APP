import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthWrapper } from './wrapper/Auth';
import { AuthContext } from './context/auth';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';

const Stack = createStackNavigator();

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
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
