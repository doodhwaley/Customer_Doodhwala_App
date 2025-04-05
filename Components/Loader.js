import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, ActivityIndicator, Text } from 'react-native-paper';
import { Config } from '../Constants';

const Loader = (props) => {

  return (
    <View>
      <Portal>
        <Dialog visible={props.visible}>
          <Dialog.Content>
            <ActivityIndicator size="large" color={Config.baseColor} />
            <Text style={{alignSelf:'center',fontFamily : `${Config.font}`,marginTop:20,fontSize:20}} >Loading</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Loader;