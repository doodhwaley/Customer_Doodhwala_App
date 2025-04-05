import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { Config } from '../../Constants'

function Counter({quantity, setQuantity, selected}) {
    return (
        <View style={styles.pricing}>
            <View style={styles.counter}>
                <TouchableOpacity 
                    style={{backgroundColor : Config.baseColor,paddingHorizontal: 20,borderRadius: 2,paddingVertical:6}} 
                    mode="contained" 
                    onPress={() => setQuantity(quantity>0 ? quantity -1 : 0)}
                >
                    <AntDesign name="minus" size={15} color="white" />
                </TouchableOpacity>

                    <Text style={{fontSize:20,color: Config.secondColor}}>{quantity}</Text>
                
                <TouchableOpacity 
                    style={{backgroundColor : Config.baseColor,paddingHorizontal: 20,borderRadius: 2,paddingVertical:6}} 
                    mode="contained" 
                    onPress={() => setQuantity(quantity +1)}
                >
                    <AntDesign name="plus" size={15} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.price}>
                <Text style={{color:"white",fontFamily:`${Config.font}`}}>Rs.{selected.price*quantity}</Text>
            </View>
        </View>
    )
}

export default Counter
const styles= StyleSheet.create({

    pricing : {
        // width : width*0.6,
        flexDirection : "row",
        // alignSelf:"center",
        margin:10,
        justifyContent : "space-between",
        backgroundColor : 'white',
        padding : 8,
        borderRadius : 4

    },
    counter : {
        flexDirection:"row",
        // borderRadius: width*0.8/2,
        // borderWidth : 2,
        // borderColor : "white",
        padding : 7,
        // backgroundColor : `${Config.baseColor}`,
        width: "60%",
        justifyContent:"space-around",
        alignItems:"center",

    },
    price : {
        backgroundColor : `${Config.baseColor}`,
        borderRadius: 4,
        width : "25%",
        justifyContent : "center",
        alignItems : "center",
    },
})