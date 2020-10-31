import { Dimensions, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const { width } = Dimensions.get('screen');

export const formStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    backgroundColor: colors.royal_blue_light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 25,
  },
});
