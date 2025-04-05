import * as React from "react"
import Svg, { SvgProps, Path, G, Circle } from "react-native-svg"
import { View, TouchableOpacity ,StyleSheet} from "react-native";
import { Config } from "../Constants";
import { Ionicons } from "@expo/vector-icons";


export function TabBg({color = '#FFFFFF',...props})  {
    return (
      <Svg
        width={75}
        height={61}
        viewBox="0 0 75 61"
        {...props}
      >
        <Path
          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
          fill={color}
        />
      </Svg>
    )
  };
  export function TabBarAdvancedButton({bgColor = 'transparent',...props}) {
    return(
    <View
      style={styles.container}
      pointerEvents="box-none"
    >
      <TabBg
        color={bgColor}
        style={styles.background}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
      >
      <Ionicons name="home" size={23} color="white" />

      </TouchableOpacity>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      width: 75,
      alignItems: 'center',
      backgroundColor : "transparent",
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      justifyContent : "center"
    },
    background: {
      position: 'absolute',
      // top: 0,
      backgroundColor : "transparent",
      // marginTop : -60
    },
    button: {
      top: -0.5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 70,
      borderRadius: 27,
      backgroundColor: Config.secondColor,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      shadowColor: "#000",
      shadowOffset: {
          width: 6,
          height: 6,
      },
      shadowOpacity: 0.6,
      shadowRadius: 8.30,

      elevation: 16,
    },
    buttonIcon: {
      fontSize: 16,
      color: '#F6F7EB'
    }
  })