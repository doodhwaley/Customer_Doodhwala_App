import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { styles } from "../../styles/auth";
import { getAreas, registerUser } from "../../Services/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { APP_NAME, Config } from "../../Constants";
import { Picker } from "@react-native-picker/picker";
import { getCities, getSubAreas } from "../../Services/User";
import Loader from "../../Components/Loader";
import Footer from "../../Components/AuthStack/Footer";
import CustomButtonAuth from "../../Components/AuthStack/CustomButton";
import CustomInput from "../../Components/AuthStack/CustomInput";
import CustomDropDown from "../../Components/AuthStack/CustomDropDown";
import { Button } from "react-native-paper";

const { height } = Dimensions.get("window");

function Register({ navigation }) {
  const [cities, setCities] = React.useState(null);
  const [areas, setAreas] = React.useState(null);
  const [subareas, setSubAreas] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [area, setArea] = React.useState(null);
  const [subarea, setSubArea] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getCities().then((res) => setCities(res));
  }, []);

  async function handleRegister(values) {
    values.image = image;
    values.subarea = subarea;
    // console.log("RIZWAN values", values);
    // setLoading(true);
    await registerUser(values)?.then(async (res) => {
      try {
        await AsyncStorage.setItem("token", res.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.user));
        await AsyncStorage.setItem("customer", JSON.stringify(res.customer));
        if (res) {
          setLoading(false);
          navigation.navigate("OTPScreen");
        }
      } catch (e) {
        setLoading(false);
      }
    });
  }

  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setImage(pickerResult);
  };

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
        onSubmit={(values) => handleRegister(values)}
        validationSchema={yup.object().shape({
          username: yup.string().required(),
          password: yup.string().min(5).required(),
          phone: yup.string().required().min(11),
          email: yup.string().email().required(),
          address: yup.string().required(),
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
                style={{ ...styles.logo, height: height * 0.05 }}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={{ ...styles.title, fontSize: 12 }}>{APP_NAME}</Text>
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

            <CustomInput
              value={values.phone}
              onChangeText={handleChange("phone")}
              label="Phone Number"
              onBlur={() => setFieldTouched("phone")}
              touched={touched.phone}
              errors={errors.phone}
            />

            <CustomInput
              value={values.email}
              onChangeText={handleChange("email")}
              label="Email"
              onBlur={() => setFieldTouched("email")}
              touched={touched.email}
              errors={errors.email}
            />

            <CustomDropDown
              data={cities}
              label="Select your City"
              value={city}
              onValueChange={(itemValue) => {
                setCity(itemValue);
                if (itemValue != null)
                  getAreas(itemValue).then((res) => setAreas(res));
              }}
            />

            <CustomDropDown
              data={areas}
              label="Select your Area"
              value={area}
              onValueChange={(itemValue) => {
                setArea(itemValue);
                if (itemValue != null)
                  getSubAreas(itemValue).then((res) => setSubAreas(res));
              }}
            />

            <CustomDropDown
              data={subareas}
              label="Select your Sub Area"
              value={subarea}
              onValueChange={(itemValue) => setSubArea(itemValue)}
            />

            <CustomInput
              value={values.address}
              onChangeText={handleChange("address")}
              label="Street and House Number"
              onBlur={() => setFieldTouched("address")}
              touched={touched.address}
              errors={errors.address}
            />

            <View>
              <Button
                onPress={pickImage}
                style={styles.imageBtn}
                mode="contained"
                icon={"account"}
              >
                <Text>
                  {image !== null ? "Image Selected" : "Select Profile Image"}
                </Text>
              </Button>
            </View>

            <CustomButtonAuth
              title="Sign Up"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>

      <Footer
        mainText="New Here? "
        buttonFunc={() => navigation.navigate("Login")}
        buttonText="Sign In"
        endText=" Instead"
      />
      <Loader visible={loading} />
    </ScrollView>
  );
}

export default Register;
