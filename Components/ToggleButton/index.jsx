import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import {styles} from './styles';

const ToggleButton = ({
  value,
  onValueChange,
  trackColor = {false: '#767577', true: '#4488FF'},
  thumbColor = '#fff',
}) => {
  const translateX = useSharedValue(value ? 21 : 0);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  React.useEffect(() => {
    translateX.value = withTiming(value ? 21 : 0, {
      duration: 200,
    });
  }, [value, translateX]);

  const toggleSwitch = () => {
    onValueChange(!value);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      style={{
        width: 40,
        height: 17,
        borderRadius: 15,
        backgroundColor: value ? trackColor.true : trackColor.false,
        padding: 2,
      }}>
      <Animated.View
        style={[
          {
            width: 20,
            height: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 11,
            position: 'absolute',
            top: -2,
            backgroundColor: thumbColor,
          },
          thumbStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default ToggleButton;
