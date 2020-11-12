import styled from 'styled-components/native';
import colors from '../utils/colors';
import * as Animatable from 'react-native-animatable';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.royal_blue};
`;

export const Content = styled.View`
  /* flex: 1; */
  width: 100%;
  background-color: ${colors.royal_blue};
  justify-content: ${(props) => props.jusifyContent ?? 'center'};
  padding: 0 0 10px 0;
`;

export const AnimtableContent = styled(Animatable.View)`
  flex: 1;
  width: 100%;
`;
