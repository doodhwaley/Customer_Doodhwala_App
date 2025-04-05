import React from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {APP_NAME, Config} from '../Constants';

const {width} = Dimensions.get('window');

export default class MySplash extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
    xPosition: new Animated.Value(1000),
    yPosition: new Animated.Value(-1000),
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(this.state.yPosition, {
        toValue: 20,
        velocity: 4,
        tension: 2,
        friction: 7,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(this.state.xPosition, {
          toValue: 150,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true,
        }).start(() => {
          this.props.okay(true);
        });
      });
    });
  };

  componentDidMount() {
    this.fadeIn();
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Image
          source={require('../assets/images/logo.png')}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'contain',
            opacity: this.state.fadeAnim,
            transform: [{translateX: this.state.yPosition}],
          }}
        />
        {/* <Animated.Text source={require("../assets/images/i2.png")} style={{
              width:27,height:27,resizeMode:"contain",    
              position: "absolute",
              bottom: 160,
              left: 0,
              right: 0,transform: [{translateX: this.state.yPosition}]}} 
          /> */}
        <Animated.Text
          style={{
            left: width / 4,
            right: 0,
            transform: [{translateY: this.state.xPosition}],
            fontSize: 30,
            alignSelf: 'center',
            color: Config.baseColor,
            position: 'absolute',
            fontFamily: `${Config.font}_bold`,
          }}>
          {APP_NAME}
        </Animated.Text>
      </View>
    );
  }
}
