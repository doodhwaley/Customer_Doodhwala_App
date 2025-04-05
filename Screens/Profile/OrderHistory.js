import React from 'react'
import {View,Text, ActivityIndicator, StyleSheet,Dimensions,ScrollView} from 'react-native'
import {getOrderHistory} from '../../Services/Order'
import OrderTile from '../../Components/Order/OrderTile'
import Header from '../../Components/Header'
import { Config } from '../../Constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from '../../Services/User'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width,height} = Dimensions.get('window')

export default function OrderHistory(props) {
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState({})
    React.useEffect(() => {
        (async () => {
            
            let guest = await AsyncStorage.getItem("guest");
            
            if (!(guest != undefined || guest != null)) {
                getOrderHistory().then(res => {
                    setData(res)
                    setLoading(false)
                })
            }
            else {
                signOut(true).then(() => {
                    props.navigation.navigate("AuthStack",{screen : "Login"})
                })            
            }
        })()
    },[])

    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{justifyContent:"center",alignItems:"center"}} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                navigation={props.navigation} 
                title="Order History"
                backButton={true}
                goBack={() => props.navigation.navigate("ProfileStack",{screen : "Profile"})}  
            />
            <ScrollView style={styles.orderContainer}>
                {data.length>0 ? data.map((item,index) => {
                    return(
                        <OrderTile cancel={false} item={item} key={index} showTrack={false} />
                    )
                }): <Text style={{justifyContent:"center",alignSelf:"center",fontFamily:`${Config.font}_bold`,fontSize:20}}>Sorry, No History Available Yet</Text>}
            </ScrollView>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
container : {
    flex : 1,
},
order : {
    backgroundColor : "white",
    padding : 10,
    marginVertical : 3,
    width : width*0.9,
    borderWidth : 0.5,
    borderColor : `${Config.baseColor}`
},
orderContainer : {
    paddingTop: 30
},
orderContent : {
    fontSize : 14,
    fontFamily : `${Config.font}_medium`
},
orderDate : {
    color : "grey",
    alignSelf: "flex-end",
    fontFamily : `${Config.font}_medium`,
    fontSize : 12

}
})
