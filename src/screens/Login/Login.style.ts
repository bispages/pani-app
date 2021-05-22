import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';
import { material } from 'react-native-typography';

export default StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 0.5,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avoidView: { flex: 0.5, width: '100%' },
  headline: {
    flex: 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    ...material.headlineObject,
    color: Colors.primary,
  },
  subHeading: {
    ...material.captionObject,
    color: Colors.primary,
  },
  inputset: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  preText: {
    opacity: 0.6,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRightWidth: 2,
    borderRightColor: Colors.greyfriendTwo,
  },
  textInput: {
    width: '70%',
  },
  checkboxContainer: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    ...material.captionObject,
    color: Colors.primary,
    textDecorationLine: 'none',
  },
  iconStyle: {
    borderRadius: 4,
    borderColor: Colors.secondary,
  },
  btnContainer: {
    flex: 0.3,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    height: 50,
  },
  phoneVerifyContainer: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonenum: {
    ...material.titleObject,
    fontSize: 16,
    marginLeft: 8,
  },
  otpTextInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    marginBottom: 10,
  },
  inputsetContainer: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  codeContainer: {
    flex: 0.5,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resendContainer: {
    flex: 0.5,
    width: '80%',
    flexDirection: 'row',
    paddingTop: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  resendText: {
    padding: 4,
    ...material.buttonObject,
    color: Colors.primary,
  },
  resendBtn: {
    padding: 4,
    marginLeft: 2,
  },
  resendBtnTxt: {
    ...material.buttonObject,
    color: Colors.secondary,
  },
});
