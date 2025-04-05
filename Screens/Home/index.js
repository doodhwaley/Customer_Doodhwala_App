import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {StatusBar} from 'react-native';
import {TextAlignLeft, UserCircle} from 'phosphor-react-native';
import ProductCard from '../../Components/ProductCard';
import Searchbar from '../../Components/Searchbar';
import CategoryCard from '../../Components/CategoryCard';
import ProductDetailCard from '../../Components/ProductDetailCard';
import Slider from '../../Components/Slider';
import DateSlider from '../../Components/DateSlider';
import useGetAllCategories from '../../hooks/useGetAllCategories';
import {Config} from '../../Constants';

function Home({navigation}) {
  const {categories, loading, error, refresh} = useGetAllCategories();
  const {width, height} = Dimensions.get('window');
  const [sliderImages, setSliderImages] = useState([
    require('../../assets/images/1.jpg'),
    require('../../assets/images/2.jpeg'),
    require('../../assets/images/3.jpeg'),
  ]);

  const SkeletonLoader = () => (
    <View style={{flex: 1}}>
      {/* Slider skeleton */}
      <View
        style={{
          height: height * 0.25,
          backgroundColor: '#E1E9EE',
          marginBottom: 10,
        }}
      />

      {/* Categories header skeleton */}
      <View
        style={{
          backgroundColor: '#E1E9EE',
          height: height * 0.05,
          marginVertical: 8,
        }}
      />

      {/* Categories grid skeleton */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 5,
          gap: 3,
          justifyContent: 'space-between',
        }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <View
            key={index}
            style={{
              width: width / 3 - 6,
              height: width / 3 - 6,
              backgroundColor: '#E1E9EE',
              marginBottom: 3,
              borderRadius: 8,
            }}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}}>
      <StatusBar color={Config.baseColor} />
      <View
        style={{
          flexDirection: 'column',
          paddingHorizontal: 14,
          paddingTop: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextAlignLeft
            size={28}
            color={Config.baseColor}
            onPress={() => navigation.openDrawer()}
          />
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('UserAccount', {drawer: false})}>
            <UserCircle
              size={30}
              color={Config.baseColor}
              style={{opacity: 0.8}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
          }}>
          <Searchbar />
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <Slider
              images={sliderImages}
              showBullets={true}
              imageHeight={height * 0.25}
            />
            <View>
              <View
                style={{
                  backgroundColor: Config.baseColor,
                  justifyContent: 'center',
                  paddingLeft: 10,
                  marginVertical: 8,
                  height: height * 0.05,
                }}>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>
                  Categories
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingHorizontal: 5,
                  gap: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    gap: 3,
                  }}>
                  {categories.map((category, index) => (
                    <CategoryCard
                      key={index}
                      image={category?.image}
                      id={category?._id}
                      ratio={width / 3 - 6}
                      name={category?.name}
                    />
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
