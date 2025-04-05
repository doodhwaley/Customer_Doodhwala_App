import React, {lazy, Suspense, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginRegistrationWithMobile from './Screens/LoginRegistrationWithMobile';
import {Provider} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Import Phosphor Icons
import {
  House,
  List,
  Wallet as WalletIcon,
  Bell,
  User,
  GridFour,
  PlusCircle,
  Cube,
  Star,
  Question,
  ShareNetwork,
  SignOut,
} from 'phosphor-react-native';
import LoadingScreen from './Screens/Loading';
import Intro from './Screens/Intro';
import Home from './Screens/Home';
import Orders from './Screens/Orders';
import Wallet from './Screens/Wallet';
import Notification from './Screens/Notification';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MyAccount from './Screens/MyAccount';
import Category from './Screens/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateProduct from './Screens/CreateProduct';
import CustomDrawerContent from './Components/CustomDrawerContent';
import {signOut} from './Services/User';
import CategoryProducts from './Screens/CategoryProducts';
import {Config} from './Constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Create a separate component for AuthRedirect to avoid inline function
const AuthRedirectScreen = () => {
  const AuthRedirectWithNavigation = lazy(() =>
    import('./Components/AuthRedirect'),
  );

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#007AFF" />}>
      <AuthRedirectWithNavigation />
    </Suspense>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeTab') {
            return <House size={size} color={color} weight={'regular'} />;
          } else if (route.name === 'Orders') {
            return <List size={size} color={color} weight={'regular'} />;
          } else if (route.name === 'Wallet') {
            return <WalletIcon size={size} color={color} weight={'regular'} />;
          }
          return null;
        },
        tabBarActiveTintColor: Config.baseColor,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function HomeDrawer({route}) {
  const navigation = useNavigation();

  // Get the initial screen from params if provided
  const initialScreen = route?.params?.screen || 'HomeScreen';

  return (
    <Drawer.Navigator
      initialRouteName={initialScreen}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fbfbfb',
          width: 260,
        },
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerActiveTintColor: Config.baseColor,
      }}>
      <Drawer.Screen
        name="AuthRedirectHandler"
        component={AuthRedirectScreen}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="HomeScreen"
        component={HomeTabs}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => <House size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{
          drawerIcon: ({color, size}) => <Bell size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontWeight: '600',
            color: '#666',
          },
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerTitle: 'My Account',
          drawerLabel: 'My Account',
          drawerIcon: ({color, size}) => <User size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="MySubscriptions"
        component={Notification}
        options={{
          drawerLabel: 'My Subscriptions',
          drawerIcon: ({color, size}) => <Bell size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Categories"
        component={Notification}
        options={{
          drawerLabel: 'Shop by Category',
          drawerIcon: ({color, size}) => <GridFour size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="CreateCategory"
        component={Category}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontWeight: '600',
            color: '#666',
          },
          headerStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerTitle: 'Create Category',
          swipeEnabled: false,
          drawerLabel: 'Create Category',
          drawerIcon: ({color, size}) => (
            <PlusCircle size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          headerShown: true,
          headerTitle: 'Create Product',
          swipeEnabled: false,
          drawerLabel: 'Create Product',
          drawerIcon: ({color, size}) => <Cube size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="RateApp"
        component={Notification}
        options={{
          drawerLabel: 'Rate Our App',
          drawerIcon: ({color, size}) => <Star size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Help"
        component={Notification}
        options={{
          drawerLabel: 'Need Help',
          drawerIcon: ({color, size}) => <Question size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Share"
        component={Notification}
        options={{
          drawerLabel: 'Share',
          drawerIcon: ({color, size}) => (
            <ShareNetwork size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Logout',
          drawerIcon: ({color, size}) => <SignOut size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function LogoutScreen({navigation}) {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        setIsLoggingOut(true);
        await signOut();
        await AsyncStorage.multiRemove(['token', 'refreshToken', 'customer']);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } catch (error) {
        console.error('Error during logout:', error);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } finally {
        setIsLoggingOut(false);
      }
    };

    handleLogout();
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 20, fontSize: 16, color: '#333'}}>
        Logging out...
      </Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

function Routes() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginRegistrationWithMobile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeDrawer}
            options={{
              headerShown: false,
            }}
            initialParams={{screen: 'HomeScreen'}}
          />
          <Stack.Screen
            name="UserAccount"
            component={MyAccount}
            options={{
              title: 'My Account',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Routes;
