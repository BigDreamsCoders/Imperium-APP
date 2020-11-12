import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import colors from '../utils/colors';

const Indicator = styled(ActivityIndicator)`
  flex: 1;
`;

export function Loader() {
  return <Indicator color={colors.yellow_patito} size="large" />;
}
