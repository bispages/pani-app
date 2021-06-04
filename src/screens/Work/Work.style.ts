import { StyleSheet } from 'react-native';
import { material } from 'react-native-typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 0.4,
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  cardStyles: {
    flex: 1,
    marginBottom: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    flex: 0.6,
    width: '100%',
    paddingHorizontal: 10,
  },
  detailsCardStyles: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'center',
  },
  detailsCardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
