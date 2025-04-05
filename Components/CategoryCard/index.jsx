import React, {useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

function CategoryCard({image, name, id, ratio}) {
  const navigation = useNavigation();

  // Early return if required props are missing
  if (!name) {
    console.warn('CategoryCard missing required name prop');
    return null;
  }

  // Process the image prop safely - moved outside of render to avoid potential errors
  const getImageSource = useCallback(() => {
    // Handle string URLs
    if (typeof image === 'string') {
      return {uri: image};
    }

    // Allow direct require() images
    return image;
  }, [image]);

  // Safely handle navigation
  const handlePress = useCallback(() => {
    if (!id) {
      console.warn('CategoryCard missing ID for navigation');
      return;
    }
    navigation.navigate('CategoryProducts', {id, categoryName: name});
  }, [id, navigation, name]);

  // Capture the image source once to prevent multiple calculations
  const imageSource = getImageSource();

  return (
    <TouchableOpacity
      style={[styles.container, {width: ratio}]}
      onPress={handlePress}>
      <Image
        source={imageSource}
        style={styles.image}
        onError={e => {
          console.warn(
            'Image loading error for category:',
            name,
            e.nativeEvent.error,
          );
        }}
      />
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}

export default CategoryCard;
