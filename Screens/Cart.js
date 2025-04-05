import React from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {calculateOrderPrice, readCart} from '../Services/Cart';

const {width, height} = Dimensions.get('window');

//Here we import the components
import Card from '../Components/Cart/Card';
import Header from '../Components/Header';

import {Entypo, AntDesign} from '@expo/vector-icons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../SVGs/404';
import {Paragraph} from 'react-native-paper';
import {Config} from '../Constants';
import Loader from '../Components/Loader';

export default function Cart(props) {
  const [cartArr, setCartArr] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  const [trigger, setTrigger] = React.useState(0);

  React.useEffect(() => {
    readCart().then(res => {
      setCartArr(res.cartArr);
      setTotal(res.orderPrice);
      setLoading(false);
    });
  }, [trigger]);

  if (loading) {
    return <Loader visible={loading} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar color="white" />
      <Header title="My Cart" navigation={props.navigation} />
      <ScrollView style={{marginBottom: 110}}>
        {cartArr.length > 0 ? (
          cartArr?.map((order, index) => {
            return (
              <Card
                setTrigger={setTrigger}
                trigger={trigger}
                key={index}
                order={order}
                index={index}
                navigation={props.navigation}
              />
            );
          })
        ) : (
          <View style={{alignItems: 'center', flex: 1}}>
            <Error width={200} height={200} />
            <Paragraph style={{textAlign: 'center'}}>
              Currently, There are no Items in the Cart
            </Paragraph>
          </View>
        )}
      </ScrollView>

      <View style={styles.checkout}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => props.navigation.navigate('Checkout')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="shopping-cart" size={25} color="white" />
            <View style={{paddingLeft: 10}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: `${Config.font}_medium`,
                  fontSize: 14,
                }}>
                {cartArr.length} Items
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: `${Config.font}_bold`,
                  fontSize: 14,
                }}>
                Rs.{total}{' '}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: `${Config.font}`,
              color: 'white',
            }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkout: {
    bottom: 60,
    backgroundColor: Config.baseColor,
    position: 'absolute',
    padding: 10,
    borderRadius: 2,
    zIndex: 10,
    left: 10,
    width: '95%',
  },
});
