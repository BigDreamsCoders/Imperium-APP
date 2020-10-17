import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import { DummyText } from './components/DummyText';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={style.container}>
          <DummyText>Imperium APP</DummyText>
        </View>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
