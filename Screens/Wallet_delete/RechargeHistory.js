import React, { useState, useCallback, useEffect } from 'react'
import {View, StyleSheet, Dimensions,Text,ScrollView} from 'react-native'
import Header from '../../Components/Header'
import {SafeAreaView} from 'react-native-safe-area-context'
import { getRechargeHistory } from '../../Services/Wallet'
import moment  from 'moment'
import { Config } from '../../Constants'
import { Avatar, Chip, Divider } from 'react-native-paper'

const {width,height} = Dimensions.get("window")

  

export default function RechargeHistory(props) {
    const [rechargeHistory, setRechargeHistory] = useState([]);

    useEffect(() => {
        (async () => {
            await getRechargeHistory().then(response => {
                setRechargeHistory(response);
            })
        })()
    }, []);

        return (
            <SafeAreaView style={styles.container}>
                <Header title="RechargeHistory" navigation={props.navigation} goBack={props.navigation.goBack} />
                
                <ScrollView style={styles.RechargeHistoryContainer}  contentContainerStyle={{justifyContent: "center",alignItems : "center",}}>
                    <Divider/>
                    {rechargeHistory.map((item,index) => {
                        return(
                            <>
                            <View style={styles.RechargeHistory}>
                                <View style={{paddingVertical:10,flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between'}} >
                                    <Text style={styles.RechargeHistoryContent}>Rs.{item.amount}</Text>
                                    {/* <Avatar.Image source={{uri: item.payment_detail.image && item.payment_detail.image}}  /> */}

                                </View>
                                <View style={{flexDirection : 'row',justifyContent : 'space-between'}} >
                                    <Text style={{fontFamily : `${Config.font}`}} >Type:</Text>
                                    <Text>{item.payment_detail.type_of}</Text>
                                </View>

                                <View style={{flexDirection : 'row',justifyContent : 'space-between'}} >
                                    <Text style={{fontFamily : `${Config.font}`}} >Transaction ID:</Text>
                                    <Text>{item.payment_detail.transaction_id}</Text>
                                </View>

                                <View style={{flexDirection : 'row',justifyContent : 'space-between',alignItems :'center'}} >
                                    <Text style={{fontFamily : `${Config.font}`}} >Status</Text>
                                    <Chip 
                                        style={{
                                            backgroundColor : item.payment_detail.status.toUpperCase() == 'SUCCESS' ? 'green' : 'red',
                                        }} 
                                        textStyle={{fontFamily : `${Config.font}`,fontSize : 12,color : "white"}}
                                    >{item.payment_detail.status.toUpperCase()}</Chip>
                                </View>
                                <Text style={styles.RechargeHistoryDate}>{moment(item.date).format('DD/MM/YYYY')}</Text>
                            </View>
                            <Divider/>
                            </>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        );

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    RechargeHistory : {
        backgroundColor : "white",
        padding : 10,
        // marginVertical : 6,
        width : width,
        // borderRadius : 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 13,
    },
    RechargeHistoryContainer : {
        marginVertical:20,
        paddingBottom: 20
    },
    RechargeHistoryContent : {
        fontSize : 20,
        fontFamily : `${Config.font}_medium`,
        color : Config.baseColor
    },
    RechargeHistoryDate : {
        color : "grey",
        alignSelf: "flex-end",
        fontFamily : `${Config.font}_medium`,
        fontSize : 12

    }
})
