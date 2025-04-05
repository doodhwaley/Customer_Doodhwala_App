import React from 'react'
import { StyleSheet,Dimensions,ScrollView,RefreshControl, Alert} from 'react-native'
import {getSubscriptions, deleteSubscription as delItem} from '../../Services/Subscriptions'
import SubscriptionTile from '../../Components/Subscription/SubscriptionTile'
import Header from '../../Components/Header'
import { Config } from '../../Constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../Components/Loader'

const {width,height} = Dimensions.get('window')

export default function OrderHistory(props) {
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState({})
    React.useEffect(() => {
        getSubscriptions().then(res => {
            setData(res)
            setLoading(false)
        })
    },[])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getSubscriptions().then(res => {
        setData(res)
        setRefreshing(false)
    })
    }, []);

    const deleteSubscription = (id) => {
        setLoading(true)
        delItem(id).then(res => {
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            Alert.alert(e.message,e.response.detail.data)
        })
    }

    if (loading) {
        return <Loader visible={loading} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                navigation={props.navigation} 
                title="My Subscriptions"
                backButton={true}
                goBack={() => props.navigation.navigate("ProfileStack",{screen : "Profile"})}  
            />
            <ScrollView style={styles.orderContainer}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
            >
                {data.map((item,index) => {
                    return(
                        <SubscriptionTile deleteSubscription={deleteSubscription} navigation={props.navigation} item={item} key={index} showTrack={false} />
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
order : {
    backgroundColor : "white",
    padding : 10,
    marginVertical : 3,
    width : width*0.9,
    borderWidth : 0.5,
    borderColor : `${Config.baseColor}`
},
orderContainer : {
    paddingBottom: 30
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
