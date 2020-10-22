import React from 'react';
import {View, Text, Button} from 'react-native';

export default class HomeScreen extends React.Component {
  state = {users: [], hasLoadedUsers: false, userLoadingErrorMessage: ''};

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>HomeScreen</Text>
       
      </View>
    );
  }
}
