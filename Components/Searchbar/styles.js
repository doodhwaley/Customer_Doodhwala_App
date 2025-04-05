import {StyleSheet} from 'react-native';
import {Config} from '../../Constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    // backgroundColor: '#E3E7E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Config.baseColor,
    alignContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#828B8C',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    fontFamily: Config.font,
    paddingTop: 0,
    height: '100%',
    marginTop: 10,
  },
});

export default styles;
