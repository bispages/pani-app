import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    // flex: 0.2,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 1,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    textAlignVertical: 'center',
  },
  cardContainer: {
    width: '100%',
  },
  goToTopButtonView: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToTopButton: {
    height: 40,
  },
});
