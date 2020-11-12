import React from 'react';
import styled from 'styled-components/native';
import { RoutineItem } from './routineItem';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export function RoutineList() {
  return (
    <Container>
      <RoutineItem />
      <RoutineItem />
      <RoutineItem />
      <RoutineItem />
      <RoutineItem />
    </Container>
  );
}
