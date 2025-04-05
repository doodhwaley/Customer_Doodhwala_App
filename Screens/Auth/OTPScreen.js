import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View,Text, ActivityIndicator, Platform, Alert} from 'react-native';
import { Config } from '../../Constants';
import Header from '../../Components/Header';
import { TextInput,Button, Title } from 'react-native-paper';
import { sendCode, updateUser, updateUserCode } from '../../Services/User';


const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

const OtpVerification = function(props) {
  let {otpRequestData, attempts} = props;
  const [attemptsRemaining, setAttemptsRemaining] = useState(attempts || 4);
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // in secs, if value is greater than 0 then button will be disabled
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
    AUTO_SUBMIT_OTP_TIME_LIMIT,
  );

  // TextInput refs to focus programmatically while entering OTP
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);

  // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
  const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  useEffect(() => {
    // autoSubmitOtpTime value will be set after otp is detected,
    // in that case we have to start auto submit timer
    autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
  });

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);


  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
  // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
  // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
  const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);

      // submit OTP
      onSubmitButtonPress();
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };

  const startAutoSubmitOtpTimer = () => {
    if (autoSubmitOtpTimerInterval) {
      clearInterval(autoSubmitOtpTimerInterval);
    }
    autoSubmitOtpTimerInterval = setInterval(() => {
      autoSubmitOtpTimerIntervalCallbackReference.current();
    }, 1000);
  };

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '']);
      firstTextInputRef.current.focus();
    }

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    try {
      sendCode().then(res => {
      })
    }
    catch (e) {
      alert(e.message)
    }
  };

  const onSubmitButtonPress = async () => {
    let code = otpArray.join("")

    try {
        await updateUserCode(code).then(res => {
          if (res.status == 200)
              props.navigation.navigate("DrawerRoutes",{screen: "MyTabs",params: {screen : "MainStack"}})
          else {
            setAttemptsRemaining(attemptsRemaining-1)
            Alert.alert('Invalid Code','The code You Entered is Incorrect')
          }
        })
    }
    catch (e) {
      alert(e.message)
    }
  };

  // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
  // using onOtpKeyPress for this purpose
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
    };
  };

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (Platform.OS== 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
        <View style={styles.container}>
          <Title  style={styles.headline} >
            Enter OTP sent to your Mobile Number
          </Title>

          <View style={{flexDirection:'row',marginVertical : 40,justifyContent : 'space-between',marginHorizontal:20}}>
            {[
              firstTextInputRef,
              secondTextInputRef,
              thirdTextInputRef,
              fourthTextInputRef,
            ].map((textInputRef, index) => (
              <TextInput
                value={otpArray[index]}
                onKeyPress={onOtpKeyPress(index)}
                onChangeText={onOtpChange(index)}
                keyboardType={'numeric'}
                maxLength={1}
                style={{justifyContent : 'center',color : 'black'}}
                autoFocus={index === 0 ? true : undefined}
                ref={refCallback(textInputRef)}
                key={index}
                mode="outlined"
              />
            ))}
          </View>
          {errorMessage ? (
            <Text
              style={[
                styles.negativeText,
                styles.mt12,
                styles.centerAlignedText,
              ]}>
              {errorMessage}
            </Text>
          ) : null}

          {resendButtonDisabledTime > 0 ? (
            <Text style={{fontFamily : `${Config.font}`,color : "red"}} >
                {`Resend OTP in ${resendButtonDisabledTime}s`}
            </Text>
          ) : (
            <Button
                style={styles.otpResendButton}
                labelStyle={{color : Config.secondColor}}
                onPress={onResendOtpButtonPress}
                mode='outlined'
            >
                Resend OTP
            </Button>
          )}

          <View style={styles.fill} />

          {submittingOtp && <ActivityIndicator />}


          {autoSubmitOtpTime > 0 &&
          autoSubmitOtpTime < AUTO_SUBMIT_OTP_TIME_LIMIT ? (
            <Text >
                {`Submitting OTP in ${autoSubmitOtpTime}`}
            </Text>
          ) : null}

          <Text
            style={{
                alignSelf : 'center',
                paddingVertical : 20,
                fontFamily : `${Config.font}_medium`,
                fontSize: 20
            }}>
            {attemptsRemaining || 0} Attempts remaining
          </Text>
          <Button
            mode='contained'
            labelStyle={styles.submitButtonText}
            style={{backgroundColor : Config.baseColor}}
            onPress={onSubmitButtonPress}
            disabled={submittingOtp}
          >
              Submit
            </Button>
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