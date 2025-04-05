import {StyleSheet, Platform} from 'react-native';
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    width: isIOS ? 137 : 125,
    height: 150,
    borderWidth: 1,
    borderColor: '#000',
    paddingTop: 3,
    paddingHorizontal: 3,
  },
  image: {
    width: '100%',
    height: '70%',
    objectFit: 'cover',
    borderRadius: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    marginLeft: 5,
    marginTop: 5,
  },
});
export default styles;
