import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions, TouchableOpacity,TextInput, Alert } from 'react-native';
import {Formik} from 'formik'
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';
import {registerComplain as regComplain} from '../../Services/User'
import { FontAwesome5 } from '@expo/vector-icons';
import { Config } from '../../Constants';
import CustomInput from '../../Components/AuthStack/CustomInput'
import CustomButton from '../../Components/AuthStack/CustomButton'
import Header from '../../Components/Header';
import Loader from '../../Components/Loader'

const {width,height} = Dimensions.get("window")


export default class Complain extends React.Component {
    state = {
      loading : false
    }

  registerComplain(values) {
      this.setState({loading : true})
      regComplain(values).then((res) => {
        this.setState({loading : false})
        Alert.alert("Success","Complained Submitted Successfully")
      })
  }
    render() {
        return (
            <View style={styles.container}>
              <Loader visible={this.state.loading} />
              <Header 
                  navigation={this.props.navigation} 
                  title="Complain"
                  backButton={true}
                  goBack={() => this.props.navigation.navigate("Profile")}  
              />
              <View style={{paddingTop:30}} >
                <FontAwesome5 name="hands-helping" size={50} color={Config.secondColor} />
              </View>

              <View>
                  <Text style={styles.title}>Register Complain</Text>
                  <Text style={{textAlign: "center",fontFamily :`${Config.font}`, marginVertical :10,color:Config.secondColor}}>Type Your Complain Below. We will Contact You soon through Email or Phone</Text>
              </View>
                    
              <Formik
                initialValues={{ 
                  title: '' ,
                  Message: '' ,
                  }}
                  onSubmit={values => this.registerComplain(values)}
                  validationSchema={yup.object().shape({
                      title : yup
                      .string()
                      .min(4)
                      .required(),
                      Message: yup
                        .string()
                        .min(4)
                        .required(),
                    })}
                >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <View style={styles.formContainer}>
                  

                    <CustomInput 
                        value={values.title}
                        onChangeText={handleChange('title')}
                        label="Title"
                        onBlur={() => setFieldTouched('title')}
                        touched={touched.title}
                        errors={errors.title}
                    />

                    <CustomInput 
                        value={values.Message}
                        onChangeText={handleChange('Message')}
                        label="Message"
                        onBlur={() => setFieldTouched('Message')}
                        touched={touched.Message}
                        errors={errors.Message}
                        multiline={true}
                        numberOfLines={10}
                    />

                    <CustomButton 
                      onPress={() => handleSubmit(values)}
                      title="Register Complain"
                      disabled={!isValid}
                    />

                  </View>
                )}
              </Formik>
            </View>
        )
          }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor : "white"
    },
    button: {
        backgroundColor:  `${Config.baseColor}`,
        justifyContent:  "space-evenly",
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
        marginVertical : 10,
        marginTop : 60
      }
})