import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
  height: 50px;
  /* margin-top: 10px;
  border-radius: 10px; */
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
`;

export function Header() {
  const navigation = useNavigation();
  return (
    <Wrapper style={style.container}>
      <Container>
        <MaterialIcons
          name="menu"
          size={34}
          style={style.burger}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <MaterialIcons name="bell-outline" size={34} style={style.bell} />
      </Container>
    </Wrapper>
  );
}

const style = StyleSheet.create({
  container: {
    elevation: 10,
  },
  burger: {
    color: colors.yellow_patito,
    paddingLeft: 8,
  },
  bell: {
    color: colors.yellow_patito,
    paddingRight: 8,
  },
});
