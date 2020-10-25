// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { album } from '../api/users';
import { AuthContext } from '../context/auth';

export default function HomeScreen({ navigation }) {
  const {
    state: { token },
    logout,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function bootstrap() {
      try {
        const { data } = await album();
        setAlbums(data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    bootstrap();
  }, []);
  return (
    <SafeAreaView style={style.container}>
      {!isLoading ? (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const { avatar, id, first_name, last_name } = item;
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.push('Detail', item)}>
                <View style={style.card}>
                  <SharedElement id={`photo.${id}`}>
                    <Image style={style.image} source={{ uri: avatar }} />
                  </SharedElement>
                  <SharedElement id={`text.${item.id}`}>
                    <Text
                      style={style.text}>{`${first_name} ${last_name}`}</Text>
                  </SharedElement>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      ) : (
        <View />
      )}
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  card: {
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 3,
  },
  text: {
    fontSize: 24,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});
