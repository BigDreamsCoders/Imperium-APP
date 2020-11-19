import React, { useRef } from 'react';
import { AnimtableContent, Container } from '../../../style/layouts';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';
import colors from '../../../utils/colors';
import { Header } from '../../../components/header';
import styled from 'styled-components/native';

const TextWrapper = styled.View`
  width: 100%;
`;

const Text = styled.Text`
  width: 100%;
  align-self: flex-start;
  margin: 10% 0 10% 30px;
  color: ${colors.white};
  font-size: 36px;
  font-family: 'Oswald-Regular';
`;

export function Layout({ children, text }) {
  const containerRef = useRef();

  return (
    <Container>
      <SafeAreaView />
      <StatusBar backgroundColor={colors.royal_blue} />
      <Header />
      <AnimtableContent ref={containerRef}>
        {text && (
          <TextWrapper>
            <Text>{text}</Text>
          </TextWrapper>
        )}
        {children}
      </AnimtableContent>
    </Container>
  );
}
