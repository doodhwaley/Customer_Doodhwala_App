import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#333'}}>
              Hello
            </Text>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#333'}}>
              User
            </Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Icon name="map-pin" size={16} color="#666" />
                <Text style={{fontSize: 14, color: '#666', marginLeft: 4}}>
                  Location
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
