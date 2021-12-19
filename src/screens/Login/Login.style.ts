import { StyleSheet } from 'react-native';

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
    fontWeight: '700',
    fontSize: 22,
  },
  subHeading: {
    fontWeight: '300',
    fontSize: 10,
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
  },
  textInput: {
    width: '70%',
  },
  checkboxContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsAcceptedText: {
    marginLeft: 10,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: '300',
    fontSize: 12,
    textDecorationLine: 'none',
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
    fontWeight: '700',
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
    fontWeight: '400',
    fontSize: 12,
    paddingTop: 6,
    paddingHorizontal: 4,
  },
  resendBtn: {
    padding: 4,
    marginLeft: 8,
  },
  resendBtnTxt: {
    fontWeight: '700',
    fontSize: 14,
  },
});
