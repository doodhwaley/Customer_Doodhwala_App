import React from 'react';
import * as Animatable from 'react-native-animatable';
import {View, Text} from 'react-native';

function MultiStepRegister(props) {
  console.log(props.route.params.data);
  return (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Multi-step Registration</Text>
    </Animatable.View>
  );
}

export default MultiStepRegister;
