import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const logoHeight = height * 0.7 * 0.4;

export const style = StyleSheet.create({
  logo: {
    width: logoHeight,
    height: logoHeight,
    resizeMode: 'contain',
  },
});
