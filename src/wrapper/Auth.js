/* eslint-disable react-hooks/exhaustive-deps */
import { useAsyncStorage } from '@react-native-community/async-storage';
import React, { useEffect, useMemo, useReducer } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { verifyToken } from '../api/authentication';
import { AuthContext } from '../context/auth';
import { actions, AuthReducer, InitialState } from '../reducers/auth';
import constants from './../utils/constants';

export function AuthWrapper({ children }) {
  const {
    getItem: getToken,
    setItem: setToken,
    removeItem: removeToken,
  } = useAsyncStorage(constants.ASYNC_STORAGE.TOKEN);
  const [state, dispatch] = useReducer(AuthReducer, InitialState);

  useEffect(() => {
    async function bootstrap() {
      let token;
      try {
        token = await getToken();
        if (token) {
          await verifyToken(token);
          dispatch({ type: actions.RESTORE_TOKEN, token });
        } else {
          throw Error();
        }
      } catch (e) {
        dispatch({ type: actions.LOGOUT });
      }
    }
    bootstrap();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async (data) => {
        await setToken(data.token);
        dispatch({ type: actions.LOGIN, token: data.token });
      },
      logout: async () => {
        await removeToken();
        dispatch({ type: actions.LOGOUT });
      },
      state,
    }),
    [state],
  );

  if (state.isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
