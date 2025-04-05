import { View,StyleSheet } from "react-native"
import { Config } from "../../Constants"
import React from "react"
import { Picker } from "@react-native-picker/picker"


export default function CustomDropDown(props) {
    return(
        <View>
            <Picker
                selectedValue={props.value}
                onValueChange={props.onValueChange}
                itemStyle={styles.itemStyle}
                dropdownIconColor={Config.baseColor}
                mode={props.mode || "dropdown"}
            >
                <Picker.Item  label={props.label} value={null} />
                { props.data?.map((item,index) => {
                  return(
                    <Picker.Item  label={item.name} value={item.id} key={index} />
                  )
                })
                }
            </Picker>
        </View>
    )
}

const styles=StyleSheet.create({
    itemStyle : {
        height: 30, 
        fontFamily:`${Config.font}`,
        color:`${Config.baseColor}`,
        transform: [{ scaleX: 1 }, { scaleY: 1 }]
    }
})