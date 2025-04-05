import 'react-native-reanimated';
import React, {useEffect} from 'react';
import Routes from './Routes';
import AuthRedirectWrapper from './Components/AuthRedirectWrapper';
import AuthListener from './Components/AuthListener';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';

// Enable console logs
LogBox.ignoreLogs(['Require cycle:']);

export default function App() {
  useEffect(() => {
    console.log('App component mounted');
    // Add more debug logs
    console.log(
      'React Native version:',
      require('react-native/package.json').version,
    );
    console.log(
      'Reanimated version:',
      require('react-native-reanimated/package.json').version,
    );
  }, []);

  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       Fontisto: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Fontisto.ttf'),
  //       Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
  //       MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
  //       MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
  //     });
  //     setFontsLoaded(true);
  //     console.log('Fonts loaded');
  //   }
  //   loadFonts();
  // }, []);

  // if (!fontsLoaded) {
  //   return <View />; // Or your loading component
  // }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* Remove StatusBar since expo-status-bar is not available */}
      <AuthRedirectWrapper>
        <Routes />
        <AuthListener />
      </AuthRedirectWrapper>
    </GestureHandlerRootView>
  );
}
