import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_NAME, Config} from '../Constants';

const {width, height} = Dimensions.get('window');

function Header(props) {
  return (
    <View
      style={{
        backgroundColor: props.color ? props.color : `${Config.baseColor}`,
      }}>
      <View style={{...styles.header}}>
        {props.backButton ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => props.goBack()}>
            <Icon
              name="arrow-left"
              size={22}
              color={props.buttonColor ? props.buttonColor : 'white'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => props.navigation.openDrawer()}>
            <Icon
              name="bars"
              size={22}
              color={props.buttonColor ? props.buttonColor : 'white'}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            ...styles.title,
            color: props.buttonColor ? props.buttonColor : 'white',
          }}>
          {props.title}
        </Text>

        {!props.disabled && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Cart')}
              style={{...styles.backButton, flexDirection: 'row'}}>
              <Icon name="shopping-cart" size={22} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {props.title == APP_NAME && (
        <View style={styles.inputBox}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('MyTabs', {
                screen: 'MainStack',
                params: {screen: 'SearchProduct'},
              })
            }
            style={{flexDirection: 'row'}}>
            <Icon name="search" size={22} color="black" />
            <Text
              style={{
                alignSelf: 'center',
                color: 'grey',
                paddingLeft: 3,
                fontFamily: `${Config.font}`,
              }}>
              Search More Than 1000 Products
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    padding: 20,
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: `${Config.font}_bold`,
  },
  backButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
  inputBox: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    width: width * 0.9,
    textAlign: 'left',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
