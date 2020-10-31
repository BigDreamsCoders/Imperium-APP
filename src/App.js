import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthWrapper } from './wrapper/Auth';
import { SafeAreaView, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { NavigatorWrapper } from './navigators/navigators';
import colors from './utils/colors';

export function App() {
  const flashRef = useRef();
  return (
    <NavigationContainer>
      <AuthWrapper>
        <SafeAreaView style={style.container}>
          <NavigatorWrapper />
          <FlashMessage ref={flashRef} position="top" />
        </SafeAreaView>
      </AuthWrapper>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
