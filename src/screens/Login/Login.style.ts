import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';


export default StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  image: {
    flex: 0.5,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: "center",
  },
  avoidView: { flex: 0.5, width: '100%' },
  headline: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: Colors.primary,
  },
  subHeading: {
    color: Colors.primary,
  },
  inputset: {
    flex: 0.6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fieldSet: {
    width: '70%',
    height: 50,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    backgroundColor: Colors.legendBg,
  },
  preText: {
    opacity: 0.2,
    position: 'absolute',
    width: 48,
    textAlign: 'center',
    marginVertical: 10,
    borderRightWidth: 2,
    borderRightColor: Colors.primary,
    backgroundColor: Colors.naturalTwo,
  },
  textInput: {
    color: Colors.primary,
    paddingLeft: 60,
  },
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
  },
  btnset: {
    flex: 1,
  },
  button: {
    width: '70%',
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 4,
    color: Colors.naturalOne,
    backgroundColor: Colors.secondary,
  },
});