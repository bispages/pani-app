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
  editPic: {
    position: 'absolute',
    bottom: 15,
    left: '55%',
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  formContainer: {
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    marginBottom: 14,
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
    marginBottom: 14,
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
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  categoryButton: {
    width: '100%',
    height: 50,
  },
  savebtnContainer: {
    width: '100%',
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: '100%',
    height: 50,
  },
  listContainer: {
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataListChip: {
    margin: 2,
  },
  itemsListContainer: {
    width: '100%',
    height: 20,
    marginBottom: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    ...material.captionObject,
    color: Colors.primary,
    paddingHorizontal: 4,
  },
  panelTitle: {
    ...material.titleObject,
    height: 30,
  },
  panelSubtitle: {
    ...material.body2Object,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButtonContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  panelButtonView: {
    width: '90%',
    marginBottom: 20,
  },
  panelButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
