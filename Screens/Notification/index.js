import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import Header from "../../Components/Header";
import { getNotifications } from "../../Services/Notification";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../Components/Loader";
import { Config } from "../../Constants";

const { width, height } = Dimensions.get("window");

export default function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //     (async () => {
  //         await getNotifications().then(response => {
  //             setNotifications(response);
  //             setLoading(false)
  //         })
  //     })()
  // }, []);
  if (loading) return <Loader visible={loading} />;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        navigation={props.navigation}
        goBack={props.navigation.goBack}
      />

      <ScrollView
        style={styles.notificationContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {notifications.map((item, index) => {
          return (
            <View style={styles.notification} key={index}>
              <Text style={styles.notificationContent}>{item.title}</Text>
              <Text style={styles.notificationDate}>{item.message}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notification: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 6,
    width: width * 0.9,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  notificationContainer: {
    marginVertical: 10,
    // paddingBottom: 20,
    marginBottom: 30,
  },
  notificationContent: {
    fontSize: 14,
    fontFamily: `${Config.font}_medium`,
  },
  notificationDate: {
    color: "grey",
    alignSelf: "flex-end",
    fontFamily: `${Config.font}_medium`,
    fontSize: 12,
  },
});
