import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../utils/colors';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-color: ${colors.royal_blue_light};
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-right: 8px;
  padding-left: 8px;
`;

export function Header() {
  const navigation = useNavigation();
  return (
    <Wrapper style={style.container}>
      <Container>
        <Icon
          type="material-community"
          name="menu"
          color={colors.yellow_patito}
          size={34}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </Container>
    </Wrapper>
  );
}

const style = StyleSheet.create({
  container: {
    elevation: 10,
  },
});
