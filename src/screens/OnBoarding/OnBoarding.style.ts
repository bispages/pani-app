import { StyleSheet } from 'react-native';
import { material } from 'react-native-typography';

export default StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...material.headlineObject,
    flex: 0.2,
    textAlignVertical: 'center',
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    opacity: 0.8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    ...material.subheadingObject,
    flex: 0.3,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  skip: {
    paddingTop: 15,
  },
  skipTxt: {
    ...material.body1Object,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
