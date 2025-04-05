import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

/**
 * Component to handle authentication redirects
 * This should be used within a navigation context (screen component)
 */
const AuthRedirectConsumer = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Function to handle global errors from API
    const handleApiErrors = error => {
      // Check if this is a token expired error with redirect flag
      if (error?.redirectToLogin) {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please login again.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
        );
      }
    };

    // Add global error event listener
    const subscription = global.ErrorEmitter?.addListener(
      'API_ERROR',
      handleApiErrors,
    );

    return () => {
      // Clean up event listener
      subscription?.remove();
    };
  }, [navigation]);

  // This component doesn't render anything
  return null;
};

export default AuthRedirectConsumer;
