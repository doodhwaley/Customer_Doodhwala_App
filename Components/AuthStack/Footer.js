import { View,Text,TouchableOpacity } from "react-native"
import { Config } from "../../Constants"
import React from "react"

export default function Footer(props) {
    return(
    <View style={{ flexDirection:"row",marginTop: 20,justifyContent : "center",...props.style}}>
        <Text style={{color: Config.mainTextColor}}>{props.mainText}</Text>
        <TouchableOpacity onPress={props.buttonFunc}>
            <Text style={{color:Config.baseColor,fontFamily:`${Config.font}_bold`}}>{props.buttonText}</Text>
        </TouchableOpacity>
        <Text style={{color: Config.mainTextColor}}>{props.endText}</Text>
    </View>
    )
}