import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import { Config } from '../../Constants';
import { TextInput,Button, Title } from 'react-native-paper';
import { changePassword, checkCode, sendEmailCode } from '../../Services/User';
import { FontAwesome } from '@expo/vector-icons';


const OtpVerification = function(props) {
  const [email,setEmail] = useState(null)
  const [code, setCode] = useState(null);
  const [done, setDone] = useState('');
  const [step2,setStep2] = useState(false)
  const [password,setPassword] = useState(null)



  const onSendEmail = () => {
    if (email == null) return ;

    try {
      sendEmailCode(email).then(res => {
            Alert.alert("Code Sent",'We have just sent a Code at Your entered Email Address.Kindly enter that code in the box')
            setDone(true)
      })
    }
    catch (e) {
      alert(e.message)
    }
  };

  const onSubmitButtonPress = async () => {

    try {
        await checkCode(email,code).then(res => {
        if (res.status == 200) {
            Alert.alert("Success",'Please enter Your New Password')
            setStep2(true)
            setDone(false)
        }
        else {
            Alert.alert('Invalid Code','The code You Entered is Incorrect')
        }
        })
    }
    catch (e) {
      alert(e.message)
    }
  };

  const onPasswordChange = () => {

    try {
        changePassword(email,code,password).then(res => {
            Alert.alert('Success',"Your Password was changed succesfully")
          if (res.status == 200)
              props.navigation.navigate("Login")
          else {
            Alert.alert('Error','There was a problem processing your request')
          }
        })
    }
    catch (e) {
      alert(e.message)
    }
  };


  return (
        <View style={styles.container}>
{!done ? (<>
    <Title  style={styles.headline} >
            Enter Your Email Below
        </Title>

        <View style={{flexDirection:'row',marginVertical : 40,justifyContent : 'space-between',marginHorizontal:20}} >
            <TextInput
                keyboardType="email-address"
                value={email}
                mode={'outlined'}
                label="Enter Your Email"
                style={{width : '85%'}}
                onChangeText={text => setEmail(text)}
            />


            <Button
                style={{justifyContent : 'center',alignItems : 'center',width:'25%'}}
                labelStyle={{color : Config.secondColor}}
                onPress={onSendEmail}
                mode='flat'
            >
                <FontAwesome name="send" size={24} color={Config.baseColor} />
            </Button>

        </View>
        </>)
        : (<>
          <Title  style={styles.headline} >
            Enter Code sent to your Email
          </Title>

              <TextInput
                value={code}
                onChangeText={text => setCode(text)}
                keyboardType={'numeric'}
                style={{justifyContent : 'center',color : 'black'}}
                mode="outlined"
                label="Enter the 4-Digit Code"
              />


          <Button
            mode='contained'
            labelStyle={styles.submitButtonText}
            style={{backgroundColor : Config.baseColor}}
            onPress={onSubmitButtonPress}
          >
              Submit
            </Button>
            </>)
}
    {step2 && (<>
    <Title  style={styles.headline} >
            Enter Your New Password Below
        </Title>

        <View style={{flexDirection:'row',marginVertical : 40,justifyContent : 'space-between',marginHorizontal:20}} >
            <TextInput
                keyboardType="visible-password"
                value={password}
                mode={'outlined'}
                label="New Password"
                style={{width : '85%'}}
                onChangeText={text => setPassword(text)}
            />


            <Button
                style={{justifyContent : 'center',alignItems : 'center',width:'25%'}}
                labelStyle={{color : Config.secondColor}}
                onPress={onPasswordChange}
                mode='flat'
            >
                <FontAwesome name="send" size={24} color={Config.baseColor} />
            </Button>

        </View>
        </>)}
        </View>
  );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : 20,
        backgroundColor : "white"
    },
    headline : {
        fontFamily : 'Raleway_bold',
        paddingTop : 20,
        textAlign : 'justify'
    }
});

export default OtpVerification;