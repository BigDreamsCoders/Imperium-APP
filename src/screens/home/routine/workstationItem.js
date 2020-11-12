import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

const Image = styled.Image`
  width: 200px;
  height: 200px;
`;

const Wrapper = styled.TouchableWithoutFeedback``;

const Name = styled.Text`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 24px;
  border-radius: 4px;
  background-color: #00000080;
  color: white;
`;

const ActiveWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`;

export function WorkstationItem({ item, active, onPress }) {
  const { img, name } = item;
  return (
    <Wrapper
      onPress={() => {
        onPress(active);
      }}>
      <View>
        <Image source={{ uri: img }} />
        <Name>{name}</Name>
        <ActiveWrapper>
          <Icon
            name={active ? 'check-circle' : 'check-circle-outline'}
            color="green"
          />
        </ActiveWrapper>
      </View>
    </Wrapper>
  );
}

const style = StyleSheet.create({
  img: {
    resizeMode: 'stretch',
  },
});
