import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { Config } from '../../Constants';

function ProfileCard(props) {
    return (
        <>
            <TouchableOpacity style={styles.tile} onPress={props.onPress} >
                <View style={{alignItems: "center",flexDirection:'row'}} >
                    {props.icon}
                    <Text style={{fontFamily:`${Config.font}_bold`,marginLeft:20,color : Config.secondColor}}>{props.text}</Text>
                </View>
                {<AntDesign style={{alignSelf:'flex-end'}}  name="arrowright" size={24} color={Config.baseColor} />}
            </TouchableOpacity>
            <Divider style={{height: 2,color : "black"}} />
        </>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    tile : {
        // margin: 10,
        marginVertical: 0,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,

        // elevation: 7,
        backgroundColor : "white",
        padding : 25,
        justifyContent : "space-between",
        flexDirection : "row",
        // borderRadius : 10,
        alignItems : 'center'
    }
})
