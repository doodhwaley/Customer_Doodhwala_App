import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut, updateProfileImage } from "../../Services/User";

//Here we import our components
import Header from "../../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { Config } from "../../Constants";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Divider } from "react-native-paper";
import { customerState } from "../../State/Customer";
import ProfileCard from "../../Components/ProfileStack/ProfileCard";
import Loader from "../../Components/Loader";

const { width, height } = Dimensions.get("window");

function Profile(props) {
  const [data, setData] = customerState.use();
  const [loading, setLoading] = React.useState(true);
  const [isG, setG] = React.useState(false);

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
    Alert.alert("Change Image", "Do You Want to Update The Profile Image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Update",
        onPress: () => {
          setLoading(true);
          updateProfileImage(pickerResult)
            .then(async (res) => {
              let customer = data;
              customer.user = res;
              setData(customer);
              setLoading(false);
              Alert.alert("Success", "Picture Changed Successfully");
            })
            .catch((e) => {
              setLoading(false);
              Alert.alert("Error Occured", e.message);
            });
        },
        style: "cancel",
      },
    ]);
  };

  React.useEffect(() => {
    (async () => {
      let guest = await AsyncStorage.getItem("guest");

      if (!(guest != undefined || guest != null)) {
        setLoading(false);
      } else {
        setG(true);
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: "AuthStack",
          params: {
            screen: "LoginRegistrationWithMobile",
          },
        },
      ],
    });
  };

  const links = [
    {
      text: "Change Password",
      onPress: () => props.navigation.navigate("ChangePassword"),
      icon: <Entypo name="key" size={24} color={Config.secondColor} />,
    },
    {
      text: "See Order History",
      onPress: () => props.navigation.navigate("OrderHistory"),
      icon: <FontAwesome name="history" size={24} color={Config.secondColor} />,
    },
    {
      text: "Report A Complain",
      onPress: () => props.navigation.navigate("Complain"),
      icon: <AntDesign name="filetext1" size={24} color={Config.secondColor} />,
    },
    {
      text: "Change Location",
      onPress: () => props.navigation.navigate("Change Location"),
      icon: <Entypo name="location" size={24} color={Config.secondColor} />,
    },
    {
      text: "My Subscriptions",
      onPress: () => props.navigation.navigate("SubscriptionStack"),
      icon: (
        <MaterialIcons
          name="unsubscribe"
          size={24}
          color={Config.secondColor}
        />
      ),
    },
  ];

  if (loading) {
    return <Loader visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} title="Profile" />

      <Pressable style={styles.DP}>
        <Avatar.Image
          size={150}
          source={{ uri: image ? image.uri : data.user && data.user.image }}
          style={styles.pic}
        />
        <AntDesign
          onPress={pickImage}
          style={styles.ICON}
          name="camera"
          size={24}
          color={Config.secondaryColor}
        />
        <Text style={styles.username}>{data.user && data.user.username}</Text>
      </Pressable>

      {!isG &&
        links?.map((item, index) => {
          return (
            <ProfileCard
              text={item.text}
              onPress={item.onPress}
              icon={item.icon}
              key={index}
            />
          );
        })}

      <ProfileCard
        text="Sign Out"
        onPress={handleLogout}
        icon={<Feather name="log-out" size={24} color={Config.secondColor} />}
      />
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  username: {
    fontFamily: `${Config.font}_bold`,
    fontSize: 24,
    marginLeft: 0,
    color: Config.secondColor,
  },
  ICON: {
    position: "absolute",
    left: width / 2 + 25,
    top: 100,
    backgroundColor: Config.baseColor,
    padding: 6,
    borderRadius: 5,
  },
  DP: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
