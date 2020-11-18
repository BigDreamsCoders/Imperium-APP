import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Header } from '../components/header';
import { Container } from '../style/layouts';
import QR from 'react-native-qrcode-svg';
import colors from '../utils/colors';
import styled from 'styled-components/native';
import { AuthContext } from './../context/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useMutation, useQuery } from 'react-query';
import { findUserFromScan, markEntrance } from '../api/users';
import { Button } from '../style/button';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled(Container)`
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellow_patito};
`;

export function QRScreen() {
  const {
    state: {
      user: { id },
    },
  } = useContext(AuthContext);
  return (
    <Container>
      <Header />
      <Wrapper>
        <QR
          size={350}
          value={id.toString()}
          backgroundColor={colors.yellow_patito}
          logoBackgroundColor={colors.royal_blue}
        />
      </Wrapper>
    </Container>
  );
}

const Text = styled.Text`
  font-size: 24px;
  color: ${(props) => props.color ?? colors.yellow_patito};
`;

const AuthorizeButton = styled(Button)`
  background-color: ${colors.yellow_patito};
`;

export function ScanQRScreen() {
  const [scannedId, setScannedId] = useState(null);

  const {
    state: { token },
  } = useContext(AuthContext);

  const { addListener, removeListener } = useNavigation();

  const { data, refetch } = useQuery(
    ['get-user-scanned', { id: scannedId }],
    (_, { id }) => {
      console.log(id, 'este es el id');
      return findUserFromScan(token, id);
    },
  );

  const [mutation] = useMutation(markEntrance, {
    onSuccess: () => {
      showMessage({ message: 'Fue todo un exito', type: 'success' });
      setScannedId(null);
    },
    onError: () => {
      showMessage({ message: 'Ocurrio un error', type: 'danger' });
      setScannedId(null);
    },
  });

  const onSuccess = useCallback((e) => {
    const id = parseInt(e.data, 10);
    setScannedId(id);
    refetch(id);
  }, []);

  const onPress = () => {
    mutation({ id: scannedId, token });
  };

  useEffect(() => {
    const resetId = () => {
      setScannedId(null);
    };
    addListener('blur', resetId);
    return () => {
      removeListener('blur', resetId);
    };
  }, []);

  return (
    <Container>
      <Header />
      <QRCodeScanner
        topViewStyle={{ paddingBottom: 20 }}
        topContent={
          scannedId ? (
            <Text>
              Usuario detectado: {data?.firstName} {data?.lastName}
            </Text>
          ) : (
            <></>
          )
        }
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={5000}
        bottomViewStyle={{ paddingTop: 20 }}
        bottomContent={
          scannedId ? (
            <AuthorizeButton onPress={onPress}>
              <Text color={colors.royal_blue}>
                Marcar {data?.isIdentified ? 'salida' : 'entrada'}
              </Text>
            </AuthorizeButton>
          ) : (
            <></>
          )
        }
      />
    </Container>
  );
}
