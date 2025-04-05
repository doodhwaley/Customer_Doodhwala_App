import React, { Component } from 'react'
import {View,Text,TouchableOpacity, StyleSheet,Image,Dimensions, Alert} from 'react-native'

import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Config } from '../../Constants';


const {width,height} = Dimensions.get("window")

export default function ProductTile(props) {
        const [item,setItem] = React.useState({})
        React.useEffect(() => {
            setItem(props.item)
        })
        return (
            <TouchableOpacity style={styles.body} onPress={() => props.navigation.navigate("ProductPage",{id : item.id})} >
                <View >
                    <Image source={{uri : item.image}} style={styles.image} />
                </View>
                
                    <View style={{paddingHorizontal: 10,paddingVertical: 10}}>
                        <Text style={{fontFamily:`${Config.font}`,color:"black", fontSize: 20,marginBottom:10}}>{item.name}</Text>

                        <View style={{flexDirection:"row",justifyContent:"space-between"}} >
                            <Text style={{color:"grey"}} >Price</Text>
                            <Text style={{color:"grey"}} >Rs.{item.price}</Text>
                        </View>

                    { item.discount !==0 &&                        
                    (<View style={{flexDirection:"row",justifyContent:"space-between"}} >
                            <Text style={{color:"grey"}} >Discount</Text>
                            <Text style={{color:"grey"}} >Rs.{item.discount}</Text>
                        </View>)}
                    </View>


            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    body : {
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        marginTop : 10,
        backgroundColor : "white",
        marginHorizontal : 5
    },
    image : {
        resizeMode : "cover",
        width  : '100%',
        height  : width*0.35,
        alignSelf:"flex-start",
        justifyContent : "flex-start"
    },
    button : {
        backgroundColor : 'red',
        marginVertical : 10,
        width: '65%',
        padding : 8,
        justifyContent:"center",
        alignItems:"center",
        borderRadius : width*0.5/2
    }
})
