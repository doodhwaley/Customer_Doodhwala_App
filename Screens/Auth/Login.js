import React from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { styles } from "../../styles/auth";
import { signUser } from "../../Services/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_NAME, Config } from "../../Constants";
import Loader from "../../Components/Loader";
import Footer from "../../Components/AuthStack/Footer";
import CustomButtonAuth from "../../Components/AuthStack/CustomButton";
import CustomInput from "../../Components/AuthStack/CustomInput";
import { walletState } from "../../State/WalletState";
import { customerState } from "../../State/Customer";
import { Button } from "react-native-paper";
import { signInWithGoogleAsync } from "../../Components/AuthStack/GoogleLogin";

function Login({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [wallet, setWallet] = walletState.use();
  const [customer, setCustomer] = customerState.use();

  async function handleLogin(values) {
    setShow(true);
    await signUser(values.username, values.password)
      .then(async (res) => {
        try {
          await AsyncStorage.setItem("token", res.token);
          setCustomer(res.customer);
          setWallet({ balance: res.customer.balance });
          if (res.user.is_verified) {
            navigation.replace("DrawerRoutes", {
              screen: "MyTabs",
              params: { screen: "MainStack" },
            });
            setShow(false);
          } else {
            setShow(false);
            navigation.navigate("OTPScreen");
          }
        } catch (e) {
          setShow(false);
          throw e;
        }
      })
      .catch((e) => {
        console.log("RIZWAN e", e);
        setShow(false);
        if (!e.response) {
          Alert.alert("Network Error Occured");
        } else Alert.alert(e.message, e.response.data.detail);
      });
  }

  async function handleGuestLogin(values) {
    try {
      await AsyncStorage.setItem("token", "12345678");
      await AsyncStorage.setItem("guest", "true");
      navigation.navigate("DrawerRoutes", {
        screen: "MyTabs",
        params: { screen: "MainStack" },
      });
    } catch (e) {
      throw e;
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          try {
            handleLogin(values);
          } catch (e) {
            alert(e.message);
          }
        }}
        validationSchema={yup.object().shape({
          username: yup.string().required(),
          password: yup.string().min(5).required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.formContainer}>
            <View>
              <Image
                style={styles.logo}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.title}>{APP_NAME}</Text>
            </View>

            <CustomInput
              value={values.username}
              onChangeText={handleChange("username")}
              label="Username"
              onBlur={() => setFieldTouched("username")}
              touched={touched.username}
              errors={errors.username}
            />

            <CustomInput
              value={values.password}
              onChangeText={handleChange("password")}
              label="Password"
              onBlur={() => setFieldTouched("password")}
              secureTextEntry={true}
              touched={touched.password}
              errors={errors.password}
            />

            <CustomButtonAuth
              title="Sign In"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>

      <CustomButtonAuth
        title="Login As Guest"
        style={{ marginTop: 0 }}
        color={`${Config.secondColor}`}
        onPress={() => handleGuestLogin("Meeran")}
      />

      <Button
        onPress={() => {
          signInWithGoogleAsync().then((result) => {
            navigation.navigate("MultiStepRegister", { data: result });
          });
        }}
      >
        Sign In With Google
      </Button>

      <Footer
        mainText="Forgot Your Password? "
        buttonText="Reset"
        endText=" Here"
        buttonFunc={() => navigation.navigate("Reset")}
        style={{ marginTop: 0 }}
      />

      <Footer
        mainText="New Here? "
        buttonText="Sign Up"
        endText=" Instead"
        buttonFunc={() => navigation.navigate("Register")}
      />
      <Loader visible={show} />
    </ScrollView>
  );
}

export default Login;
