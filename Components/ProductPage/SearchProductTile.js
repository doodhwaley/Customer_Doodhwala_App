import React from 'react'
import {View,Text, StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native'
import { Config } from '../../Constants'

const {width,height} = Dimensions.get('window')

function SearchProductTile(props) {
    React.useEffect(() => {
    },[])
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate("ProductPage",{id : props.item.item.id,type : "full"})} >
            <Text style={styles.name}>{props.item.item.name}</Text>
            <Image source={{uri : props.item.item.image}} style={styles.image} />
                <Text style={{...styles.name,fontFamily:`${Config.font}`,fontSize:14}}>@ Rs.{props.item.item.price}</Text>
            {props.item.item.can_subscribe && 
                <Text style={{...styles.name,fontSize:14,color:`${Config.baseColor}`}}>Can Susbcribe</Text>
            }
        </TouchableOpacity>
    )
}

export default SearchProductTile

const styles = StyleSheet.create({
    container : {
        margin: 10,
        marginVertical: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        width: 0.4*width,
        paddingVertical: 5
    },
    image : {
        width: width*0.4,
        height: 100
    },
    name : {
        textAlign : "center",
        fontFamily : `${Config.font}`,
        fontSize : 20
    }
})