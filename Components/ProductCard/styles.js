import {StyleSheet, Dimensions} from 'react-native';
import {Config} from '../../Constants';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.45,
    position: 'relative',
    height: 391,
    backgroundColor: '#F7F8FB',
    borderRadius: 10,
  },
  discountContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#659938',
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Config.font,
    color: 'white',
  },
  card: {
    width: '100%',
    alignItems: 'flex-end',

    overflow: 'hidden',
    paddingBottom: 6,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '50%',
  },
  subscriptionContainer: {
    width: '100%',
    paddingHorizontal: 7,
    flexDirection: 'column',
    gap: 7,
    marginTop: 7,
  },
  buyOnceButton: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A6D67F',
    borderRadius: 5,
  },
  subscriptionButton: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC5F65',
    borderRadius: 5,
  },
  subscriptionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Config.font,
    color: 'white',
  },
  textContainer: {
    width: '100%',
    marginTop: 10,
    paddingLeft: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Config.font,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    color: 'black',
  },
  weight: {
    fontSize: 16,
    fontFamily: Config.font,
    fontWeight: '600',
    marginTop: 10,
    color: '#777777',
  },
  price: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: Config.font,
    fontWeight: '600',
    color: 'black',
  },
});

export default styles;
