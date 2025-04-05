import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Plus} from 'phosphor-react-native';
function ProductCard({product}) {
  console.log('product', product);
  return (
    <View style={styles.container}>
      <View style={styles.discountContainer}>
        <Text style={styles.discountText}>20% OFF</Text>
      </View>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: product?.image}} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {product.name}
            <Text style={styles.subTitle}> - Delicious Milk</Text>
          </Text>
          <Text style={styles.weight}>{product.size}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <View style={styles.subscriptionContainer}>
          {/* PLUS BUTTON */}
          {/* <TouchableOpacity style={styles.plusButton}>
            <Plus size={26} color="black" />
          </TouchableOpacity> */}
          {/* SUBSCRIPTION BUTTON */}
          <TouchableOpacity style={styles.subscriptionButton}>
            <View style={styles.subscriptionButtonText}>
              <Text style={styles.subscriptionButtonText}>Subscribe Now</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyOnceButton}>
            <View style={styles.subscriptionButtonText}>
              <Text style={styles.subscriptionButtonText}>Buy Once</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProductCard;
