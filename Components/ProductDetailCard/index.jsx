import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

function ProductDetailCard() {
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
            source={require('../../assets/images/500ml-x-12-1-min.jpg')}
          />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>
            Delicious Milk with quality that good one It's a good one
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>4.5</Text>
              <Icon name="star" size={16} color="#64A939" />
            </View>
            <Text style={styles.ratingCount}>100 Ratings</Text>
          </View>
          {/* SELECT QUANTITY */}
          <Text style={styles.price}>$44</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {/* Buy once button */}
        <TouchableOpacity style={styles.buyOnceButton}>
          <Text style={styles.buyOnceButtonText}>Buy Once</Text>
        </TouchableOpacity>
        {/* Subscription button */}
        <TouchableOpacity style={styles.subscriptionButton}>
          <Text style={styles.subscriptionButtonText}>Subscribe @ $44</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductDetailCard;
