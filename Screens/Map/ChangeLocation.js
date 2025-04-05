import React from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { updateLocation } from "../../Services/User";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EvilIcons } from "@expo/vector-icons";
import Area from "../../Components/Map/Area";
import Loader from "../../Components/Loader";
import { Config } from "../../Constants";
import { useLocation } from "expo-location";
import Header from "../../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function ChangeLocation(props) {
  const [loading, setLoading] = React.useState(true);
  const [location, setLocation] = React.useState({
    coords: { latitude: 37.78825, longitude: -122.4324 },
  });
  const [mapRegion, setMapRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = React.useState("");
  React.useEffect(() => {
    (async () => {
      await getLocation().then(async (location) => {
        setLocation(location);
        await addressFun(location);
        setLoading(false);
      });
    })();
  }, []);

  const addressFun = async (location) => {
    let address = await Location.reverseGeocodeAsync(location.coords);
    console.log(address);
    let compAddress = `${address[0].name}  ${address[0].street}  ${address[0].district}  ${address[0].subregion}  ${address[0].region},${address[0].country}`;
    setAddress(compAddress);
  };

  const setLocationFun = async (ad) => {
    let data = {};
    data.address = ad;
    data.latitude = location.coords.latitude;
    data.longitude = location.coords.longitude;
    await updateLocation(data);
  };

  if (loading) {
    return <Loader visible={loading} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps>
      <Header
        navigation={props.navigation}
        title="Change Location"
        backButton={true}
        goBack={() => props.navigation.replace("Profile")}
      />
      <GooglePlacesAutocomplete
        styles={{
          container: {
            zIndex: 8,
            marginTop: 10,
            position: "absolute",
            top: 100,
            alignSelf: "center",
            width: width * 0.9,
          },
          textInputContainer: {
            alignItems: "center",
          },
          textInput: {
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        currentLocation={false}
        fetchDetails={true}
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setAddress(details.formatted_address);
          setLocation({
            coords: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            },
          });
        }}
        query={{
          key: "AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw",
          language: "en",
        }}
        renderRightButton={(item) => (
          <EvilIcons name="search" size={24} color="black" />
        )}
      />
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={{ height: height * 0.6 }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={location.coords}
          title="My Marker"
          description="Some description"
          draggable
          onDragEnd={(e) => {
            setLocation({ coords: e.nativeEvent.coordinate });
            addressFun({ coords: e.nativeEvent.coordinate });
          }}
        />
      </MapView>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: `${Config.font}_medium`,
              color: `${Config.baseColor}`,
            }}
          >
            Map Location:
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 5,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: `${Config.font}_medium`, color: "grey" }}>
            {address}
          </Text>
        </View>
        <Area
          setLoading={setLoading}
          loading={loading}
          coordFun={setLocationFun}
        />
      </View>
    </SafeAreaView>
  );
}

export default ChangeLocation;

const styles = StyleSheet.create({
  box: {
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    padding: 10,
  },
});

export async function getLocation() {
  const { status } = await useLocation.askAsync(
    useLocation.LOCATION_FOREGROUND
  );
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Lowest,
  });
  console.log(location);
  return location;
}
