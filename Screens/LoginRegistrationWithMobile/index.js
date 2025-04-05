import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button} from 'react-native-paper';
import {APP_NAME, Config} from '../../Constants';
import Loader from '../../Components/Loader';
import Footer from '../../Components/AuthStack/Footer';
import CustomButtonAuth from '../../Components/AuthStack/CustomButton';
import CustomInput from '../../Components/AuthStack/CustomInput';
import {walletState} from '../../State/WalletState';
import {customerState} from '../../State/Customer';
import {signInWithGoogleAsync} from '../../Components/AuthStack/GoogleLogin';
import {styles} from '../../styles/auth';
import PhoneInput from '../../Components/PhoneInput';
import {userSignupWithMobile} from '../../Services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginRegistrationWithMobile({navigation}) {
  const {width, height} = Dimensions.get('window');
  const [show, setShow] = useState(false);
  const phoneInput = useRef(null);
  const [code, setCode] = useState(null);

  const handleLogin = async values => {
    try {
      setShow(true);
      // navigation.navigate("Home");
      console.log('Login successful', values);
      userSignupWithMobile(values.phone, values.password)
        .then(async res => {
          if (res.status === 200) {
            await AsyncStorage.setItem('token', res?.data?.token);
            setShow(false);
            // Navigate to the main Home stack which contains the drawer
            navigation.navigate('Home', {
              screen: 'HomeScreen',
            });
          }
        })
        .catch(err => {
          setShow(false);
          alert('Login failed. Please check your credentials and try again.');
        });
    } catch (error) {
      setShow(false);
    }
  };

  const validationSchema = yup.object().shape({
    phone: yup
      .string()
      .min(10)
      .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
      .required('Phone number is required'),
    password: yup
      .string()
      .min(7, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  return (
    <ScrollView
      style={[styles.container, {paddingTop: height * 0.1}]}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Formik
        initialStatus={{
          phone: '3224999051',
          password: '12345678',
        }}
        initialValues={{
          phone: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          isValid,
          setFieldTouched,
        }) => (
          <View style={[styles.formContainer, {width: width * 0.8}]}>
            <View>
              <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
              />
              <Text style={styles.title}>{APP_NAME}</Text>
            </View>

            <View
              style={{
                width: width * 0.8,
                marginTop: height * 0.08,
                marginBottom: height * 0.02,
              }}>
              <PhoneInput
                ref={phoneInput}
                defaultCode="PK"
                layout="second"
                containerStyle={[
                  {
                    width: width * 0.8,
                    borderWidth: 1,
                    borderColor: Config.baseColor,
                    borderRadius: 10,
                    overflow: 'hidden',
                    height: height * 0.07,
                  },
                ]}
                codeContainerStyle={{
                  // borderRightWidth: 1,
                  // borderRightColor: Config.baseColor,
                  borderRightWidth: 0,
                  height: height * 0.07,
                }}
                inputContainerStyle={{}}
                codeTextStyle={{
                  fontSize: 16,
                  fontFamily: Config.font,
                }}
                inputStyle={{
                  fontSize: 16,
                  fontFamily: Config.font,
                  paddingLeft: 10,
                }}
                placeholderTextColor="grey"
                maxLength={10}
                keyboardType="numeric"
                onChangeText={text => {
                  setFieldValue('phone', text);
                  setFieldTouched('phone', true);
                }}
                onBlur={() => setFieldTouched('phone', true)}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error}>{errors.phone}</Text>
              )}

              <TextInput
                style={styles.passInput}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="grey"
                value={values.password}
                onChangeText={text => {
                  setFieldValue('password', text);
                  setFieldTouched('password', true);
                }}
                onBlur={() => setFieldTouched('password', true)}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <CustomButtonAuth
              title="Login/Register"
              loading={show}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>
      {/* <Loader visible={show} /> */}
    </ScrollView>
  );
}

export default LoginRegistrationWithMobile;
