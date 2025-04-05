import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Config} from '../../Constants';
import React from 'react';
import {Button} from 'react-native-paper';
import {ActivityIndicator} from 'react-native';

const {width} = Dimensions.get('window');

export default function CustomButtonAuth({
  color,
  title,
  onPress,
  disabled,
  style,
  loading,
}) {
  let backgroundColor = color || Config.baseColor;
  return (
    <TouchableWithoutFeedback
      style={{...styles.button, ...style, backgroundColor}}
      onPress={onPress}
      disabled={disabled || false}>
      <View style={{...styles.button, ...style, backgroundColor}}>
        {loading ? (
          <ActivityIndicator size="large" color={'#fff'} />
        ) : (
          <Text
            style={{
              color: Config.secondaryColor,
              fontSize: 16,
              fontFamily: `${Config.font}_bold`,
            }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    alignItems: 'center',
    width: width * 0.8,
    height: width * 0.12,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
