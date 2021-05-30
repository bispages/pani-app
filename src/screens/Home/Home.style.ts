import { StyleSheet } from 'react-native';
import { material } from 'react-native-typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    ...material.display2Object,
  },
});
