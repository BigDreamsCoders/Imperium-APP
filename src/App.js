import React, { useEffect, useRef } from 'react';
import 'react-native-gesture-handler';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { AuthWrapper } from './wrapper/Auth';
import { LogBox, SafeAreaView, StyleSheet } from 'react-native';
import { NavigatorWrapper } from './navigators/navigators';
import FlashMessage from 'react-native-flash-message';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const queryCache = new QueryCache();

export function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Setting a timer',
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);

  const flashRef = useRef();
  return (
    <NavigationContainer>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <AuthWrapper>
          <SafeAreaView style={style.container}>
            <NavigatorWrapper />
            <FlashMessage ref={flashRef} position="top" />
          </SafeAreaView>
        </AuthWrapper>
      </ReactQueryCacheProvider>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
