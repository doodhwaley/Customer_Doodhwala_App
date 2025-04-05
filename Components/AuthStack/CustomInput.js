import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Config } from "../../Constants";
import React from "react";
import { Button, TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");

export default function CustomInput(props) {
  console.log(props?.style);
  return (
    <View style={styles.input}>
      <TextInput
        value={props.value}
        style={[
          {
            ...styles.inputBox,
            marginVertical: props.marginVertical ? props.marginVertical : 6,
          },
          props.style,
        ]}
        onChangeText={props.onChangeText}
        placeholderTextColor="grey"
        label={props.label}
        onBlur={props.onBlur}
        secureTextEntry={props.secureTextEntry || false}
        {...props}
      />

      {props.touched && props.errors && (
        <Text style={styles.error}>{props.errors.toUpperCase()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    width: width * 0.8,
    alignSelf: "center",
  },
  inputBox: {
    borderColor: "#4e4e4e",
    padding: 8,
    marginVertical: 5,
    backgroundColor: "white",
    textAlign: "left",
    backgroundColor: "#e9e8e8",
  },
  error: {
    fontSize: 12,
    color: Config.mainTextColor,
    textAlign: "center",
    fontFamily: `${Config.font}`,
  },
});
