import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {Config} from '../../Constants';
import {Image, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Intro({navigation}) {
  const [pages, setPages] = useState([
    {
      backgroundColor: Config.onboarding1Color,
      image: (
        <Image
          style={styles.image}
          source={require('../../assets/images/intro/1.jpg')}
        />
      ),
      title: 'Fresh and Pure Milk',
      subtitle: 'We bring You Fresh And Pure Milk of the best quality',
    },
    {
      backgroundColor: Config.onboarding2Color,
      image: (
        <Image
          style={styles.image}
          source={require('../../assets/images/intro/2.jpeg')}
        />
      ),
      title: 'Quality Checks',
      subtitle:
        'Our milk goes through quality checks to ensure that you get the healthy product',
    },
    {
      backgroundColor: Config.onboarding3Color,
      image: (
        <Image
          style={styles.image}
          source={require('../../assets/images/intro/3.jpeg')}
        />
      ),
      title: 'Reasonable Price',
      subtitle:
        'We are delivering you high quality milk at a very reasonable price',
    },
  ]);

  const goToRoute = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem('token');
      if (typeof token === 'string') {
        navigation.navigate('Home');
      }
    }
    fetchData();
    return () => {
      setPages([]);
    };
  }, [navigation]);

  return (
    <Onboarding
      pages={pages}
      onDone={() => {
        goToRoute();
      }}
      onSkip={() => {
        goToRoute();
      }}
      nextLabel={'Next'}
      skipLabel={'Skip'}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
});
