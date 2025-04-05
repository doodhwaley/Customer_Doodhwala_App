import React, {useEffect} from 'react';
// import { useNavigation } from "@react-navigation/native";
import {Alert} from 'react-native';

/**
 * This component listens for authentication events globally
 * and handles navigation accordingly. Place it at the app root.
 */
const AuthListener = () => {
  //   const navigation = useNavigation();

  useEffect(() => {
    // Setup listener for logout events
    const logoutListener = global.ErrorEmitter?.addListener('LOGOUT', event => {
      console.log('Received logout event:', event);

      // Show alert if needed
      if (event.message) {
        Alert.alert('Session Expired', event.message);
      }

      // Navigate to login screen if redirectToLogin is true
      if (event.redirectToLogin) {
        // Use reset to clear navigation history
        //   navigation.navigate("Login");
      }
    });

    // Cleanup function
    return () => {
      logoutListener?.remove();
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default AuthListener;
