import { StyleSheet, Text } from "react-native"
import { Config } from "../../Constants"
import React from "react"
import { EvilIcons } from "@expo/vector-icons"
import moment from "moment"
import { TouchableOpacity } from "react-native-gesture-handler"
import DateTimePicker from '@react-native-community/datetimepicker'

export default function CustomDate(props) {
    return(

    <>
        <TouchableOpacity 
            onPress={props.onPress} 
            style={{flexDirection:'row'}}
        >
            <Text style={{fontFamily : Config.font}} >{moment(props.value).format('LL')}</Text>
            <EvilIcons name="calendar" size={24} color="black" />
        </TouchableOpacity>
        {props.show && 
        <DateTimePicker
            testID="dateTimePicker"
            value={new Date(props.value)}
            mode='date'
            is24Hour={true} 
            display="spinner"
            onChange={props.onChange}
        />}
    </>
    )
}
