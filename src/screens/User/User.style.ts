import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';
import { material } from 'react-native-typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.userScreenBg,
  },
  userBannerContainer: {
    flex: 0.3,
    width: '100%',
    overflow: 'hidden',
  },
  userBannerBg: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    width: 120,
    borderWidth: 4,
    borderColor: Colors.white,
    borderRadius: 120,
    height: 120,
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.userScreenBg,
  },
  icon: {
    opacity: 0.5,
  },
  formContainer: {
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preText: {
    paddingHorizontal: 8,
    marginRight: 8,
  },
  textInput: {
    width: '70%',
  },
  radioContainer: {
    width: '70%',
    display: 'flex',
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCmp: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChip: {
    marginLeft: '12%',
  },
  categorybtnContainer: {
    width: '90%',
    marginBottom: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButton: {
    width: '100%',
    height: 50,
  },
  savebtnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: '100%',
    height: 50,
  },
  listContainer: {
    flexWrap: 'wrap',
    flexGrow: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataListChip: {
    margin: 2,
  },
});
