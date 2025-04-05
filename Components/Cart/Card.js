import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {getProductDetail} from '../../Services/Product';
import {deleteCartItem, readCart} from '../../Services/Cart';

import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import {cartState} from '../../State/CartState';
import {Config} from '../../Constants';
import Counter from '../Counter/Counter';

const {width, height} = Dimensions.get('window');

export default function Card(props) {
  const [item, setItem] = React.useState({});
  const [quantity, setQuantity] = React.useState(props.order.quantity);

  React.useState(() => {
    getProductDetail(props.order.id).then(response => {
      setItem(response);
    });
  }, []);

  const handleDelete = () => {
    deleteCartItem(props.index).then(res => {
      props.setTrigger(!props.trigger);
      Alert.alert('Delete Successful', 'The item was deleted Successfully');
    });
  };

  return (
    <View style={styles.body}>
      <View style={{width: '26%'}}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>

      <View
        style={{
          width: '60%',
          paddingLeft: 8,
          // flexDirection : 'row',
          justifyContent: 'center',
          // alignItems : 'center',
          // backgroundColor : 'blue'
        }}>
        <View>
          <View>
            <Text style={{fontFamily: `${Config.font}`, color: 'grey'}}>
              {item.subcategory_detail && item.subcategory_detail.name}
            </Text>
            <Text style={{fontFamily: `${Config.font}`, fontSize: 18}}>
              {item.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: `${Config.font}`, color: 'grey'}}>
              {props.order.quantity}X
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: `${Config.font}`, color: 'grey'}}>
              Rs.{props.order.price ? props.order.price : 100}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '14%',
          paddingHorizontal: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
          <MaterialIcons name="delete" size={24} color={Config.baseColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    marginBottom: 20,

    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 15,
  },
  image: {
    resizeMode: 'cover',
    width: width * 0.25,
    height: width * 0.25,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  button: {
    marginVertical: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
