import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {checkUser} from '../../Services/User';
import Splash from '../Splash';
import {launchImageLibrary} from 'react-native-image-picker';

export default function LoadingScreen({navigation}) {
  const [go, setGo] = React.useState(false);
  console.log('LoadingScreen');

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!go) return;
      try {
        const arr = await checkUser();
        if (arr[0]) {
          if (arr[1] != null) {
            if (!arr[1].is_verified) {
              navigation.replace('Intro');
            } else {
              navigation.replace('Home', {
                screen: 'HomeScreen',
              });
            }
          } else {
            navigation.replace('Intro');
          }
        } else {
          navigation.replace('Intro');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        navigation.replace('Intro');
      }
    };

    checkUserStatus();
  }, [go, navigation]);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const permission =
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
          const hasPermission = await PermissionsAndroid.check(permission);

          if (!hasPermission) {
            const status = await PermissionsAndroid.request(permission);
            if (status !== PermissionsAndroid.RESULTS.GRANTED) {
              console.log(
                'Sorry, we need storage permissions to make this work!',
              );
            }
          }
        } else if (Platform.OS === 'ios') {
          // iOS 14+ has a system permission handler that will automatically
          // be triggered when you use launchImageLibrary
          // Just check with an empty launch to trigger permission dialog
          launchImageLibrary({selectionLimit: 0}, response => {
            // This will trigger the permissions dialog if needed
            // Cancel immediately since we're just checking permissions
            if (response.didCancel) {
              // This is expected since we just want to trigger the permission dialog
            }
          });
        }
      } catch (error) {
        console.error('Error getting permissions:', error);
      }
    };

    getPermissions();
  }, []);

  return <Splash okay={setGo} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
