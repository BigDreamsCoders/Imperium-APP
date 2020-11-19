import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import colors from '../../../utils/colors';

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.TouchableOpacity`
  position: relative;
  flex: 0.5;
  aspect-ratio: 1;
  margin: 1%;
  height: 200px;
  align-self: center;
  background-color: ${(props) =>
    props.active ? colors.yellow : `${colors.yellow_patito}`};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
`;

const NameWrapper = styled.View`
  flex: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  min-height: 40px;
  width: 100%;
  padding-right: 5px;
  background-color: #00000080;
  justify-content: center;
`;

const Name = styled.Text`
  font-size: 24px;
  color: white;
  text-align: center;
  font-family: 'Oswald-Bold';
`;

export function WorkstationItem({ item, active, onPress }) {
  const { img, name } = item;
  return (
    <Wrapper
      style={{ elevation: 4 }}
      onPress={() => {
        onPress(active);
      }}
      active={active}>
      <>
        <Image source={{ uri: img }} />
        <NameWrapper>
          <Name>{name}</Name>
        </NameWrapper>
      </>
    </Wrapper>
  );
}
