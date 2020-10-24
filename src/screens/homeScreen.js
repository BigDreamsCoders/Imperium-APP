import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/auth';

export default function HomeScreen() {
  const {
    state: { token },
    logout,
  } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{token}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
