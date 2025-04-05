import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, Dimensions, StyleSheet, Image} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styles from './styles';

const {width: screenWidth} = Dimensions.get('window');

const Slider = ({
  images,
  showBullets = true,
  autoPlay = true,
  autoPlayInterval = 3000,
  imageHeight = 100,
  bulletColor = '#007AFF',
  inactiveBulletColor = '#ccc',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useSharedValue(0);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        const nextIndex =
          activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: screenWidth * nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }
  }, [activeIndex, autoPlay, autoPlayInterval, images.length]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {[...images, images[0]].map((image, index) => (
          <View key={index} style={[styles.slide, {height: imageHeight}]}>
            <Image
              source={typeof image === 'string' ? {uri: image} : image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </Animated.ScrollView>

      {showBullets && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === activeIndex ? bulletColor : inactiveBulletColor,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Slider;
