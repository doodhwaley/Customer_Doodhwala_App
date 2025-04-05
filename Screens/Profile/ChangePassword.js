import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions, TouchableOpacity,TextInput, Alert } from 'react-native';
import {Formik} from 'formik'
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';
import {updatePassword} from '../../Services/User'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Config as C, Config } from '../../Constants';
import CustomButtonAuth from '../../Components/AuthStack/CustomButton';
import CustomInput from '../../Components/AuthStack/CustomInput';
import Loader from '../../Components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';

const {width,height} = Dimensions.get("window")


export default function ChangePassword(props) {

  const [loading,setLoading] = React.useState(false)
 
  function handleLogin(values) {
    setLoading(true)
      updatePassword(values).then(async (res) => {
        await AsyncStorage.setItem('token',res.token)
        setLoading(false)
        Alert.alert("Success",'Password Updated Successfully')
      })
  }
  return (
      <View style={styles.container}>
          <Header 
              navigation={props.navigation} 
              title="Change Password"
              backButton={true}
              goBack={() => props.navigation.navigate("Profile")}  
          />
          <Loader visible={loading}  />
          <View >
            <MaterialCommunityIcons style={styles.image} name="lock-reset" size={100} color={Config.secondColor} />
          </View>

          <View>
              <Text style={styles.title}>Change Password</Text>
              <Text style={{textAlign: "center",fontFamily :`${Config.font}`, marginVertical :10,color:Config.secondColor}}>Enter your new password below.</Text>
          </View>

          <Formik
            initialValues={{ 
              password: '' 
              }}
              onSubmit={values => handleLogin(values)}
              validationSchema={yup.object().shape({
                  oldpassword : yup
                  .string()
                  .min(4)
                  .required(),
                  password: yup
                    .string()
                    .min(4)
                    .required(),
                  confirmPassword: yup
                    .string()
                    .required()
                    .label('Confirm password')
                    .test('passwords-match', 'Passwords do not match', function(value) {
                      return this.parent.password === value;
                    }),
                })}
            >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <View style={styles.formContainer}>


                <CustomInput 
                    value={values.oldpassword}
                    onChangeText={handleChange('oldpassword')}
                    label="Old Password"
                    onBlur={() => setFieldTouched('oldpassword')}
                    secureTextEntry={true}
                    touched={touched.oldpassword}
                    errors={errors.oldpassword}
                    marginVertical={3}
                />

                <CustomInput 
                    value={values.password}
                    onChangeText={handleChange('password')}
                    label="New Password"
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                    touched={touched.password}
                    errors={errors.password}
                    marginVertical={3}
                />

                <CustomInput 
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    label="Confirm New Password"
                    onBlur={() => setFieldTouched('confirmPassword')}
                    secureTextEntry={true}
                    touched={touched.confirmPassword}
                    errors={errors.confirmPassword}
                    marginVertical={3}
                />

                <CustomButtonAuth
                  title="Save"
                  disabled={!isValid} 
                  onPress={() => handleSubmit(values)}
                />

              </View>
          )}
        </Formik>
    </View>
  )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor : C.secondaryColor
    },
    button: {
        backgroundColor:  `${Config.baseColor}`,
        justifyContent:  "center",
        alignItems:"center",
        paddingBottom: 12,
        paddingTop: 12,
        marginVertical: 20,
        borderRadius: 24,
        flexDirection :"row"
    },
    inputBox : {
      borderColor: '#4e4e4e',
      padding: 8,
      marginVertical: 5,
      backgroundColor: "white",
      width: width*0.9,
      textAlign: "left",
      borderRadius : 4  ,
      backgroundColor : '#e9e8e8'
      },
    title: {
        color: `${Config.baseColor}`,
        fontSize:22, 
        marginVertical: 20,
        fontFamily : `${Config.font}_bold`,
        textAlign : "center"
      },
      image : {
        resizeMode : "contain",
        height: height*0.14,
        marginVertical : 0,
        marginTop : 60
      }
})