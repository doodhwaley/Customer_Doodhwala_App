import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Config} from '../Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.secondaryColor,
    paddingTop: 20,
  },
  input: {
    color: 'white',
    width: width * 0.8,
    marginVertical: 6,
    alignSelf: 'center',
  },

  inputBox: {
    borderColor: '#4e4e4e',
    padding: 8,
    marginVertical: 5,
    textAlign: 'left',
    borderRadius: 4,
    backgroundColor: '#e9e8e8',
  },
  title: {
    color: `${Config.baseColor}`,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
  },
  button: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: `${Config.baseColor}`,
    paddingVertical: 10,
    width: width * 0.8,
    height: width * 0.1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: width * 0.05,
  },
  formContainer: {
    justifyContent: 'center',
  },
  logo: {
    height: height * 0.2,
    resizeMode: 'contain',
  },
  imageBtn: {
    backgroundColor: Config.secondColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.6,
    alignSelf: 'center',
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer1: {
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'center',
  },
  passInput: {
    height: height * 0.07,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: height * 0.02,
    backgroundColor: 'white',
    borderColor: Config.baseColor,
    fontSize: 16,
    borderRadius: 10,
    fontFamily: Config.font,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: Config.font,
  },
});
