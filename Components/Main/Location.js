import React from 'react';
import {View,Text,StyleSheet} from 'react-native';;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '../../Constants';
import { Button } from 'react-native-paper';
import { customerState } from '../../State/Customer';


function Location(props) {
    const [location,setLocation] = React.useState("Shahdra, Lahore")
    let customer = customerState.useValue()
    React.useEffect(() => {
        (async () => {
            let key = await AsyncStorage.getItem('guest');
            if (!(key != null || key != undefined)) {
                let address = customer.user.address
                let a = address + " \n"
                a += customer.subarea_detail.name + ", " + customer.subarea_detail.area_detail.name
                setLocation(a)
            }
        })()
    },[])
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Delivery Location</Text>

            <View style={styles.children}>

                <Text style={styles.locationText}>{location}</Text>

                <Button 
                    onPress={() => props.navigation.navigate("ProfileStack",{screen:"Change Location"})}
                    icon={"pin"}
                >
                    <Text style={{color:"grey",fontFamily:`${Config.font}`}}>Change</Text>
                </Button>

            </View>
        </View>
    )
}
export default Location;

const styles=StyleSheet.create({
    container : {
        // margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        
        elevation: 5,
        backgroundColor : "white",
        padding : 10,
        // borderRadius: 10,
        // marginTop : 10
    },
    title : {
        color:Config.baseColor,
        fontFamily:`${Config.font}_medium`
    },
    children : {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    locationText : {
        color:"grey",
        fontFamily:`${Config.font}`,
        width:'60%'
    }
})