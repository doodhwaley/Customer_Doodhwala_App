import React from 'react'
import {View,Text,Alert, ActivityIndicator, StyleSheet} from 'react-native'
import {updateSubscription} from '../../Services/Subscriptions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import { Config } from '../../Constants'
import { Button, Chip, Divider, IconButton } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            loading : false,
            price : 1,
        }
    }
    
  async componentDidMount() {


  }

  manageSubscription =  async () => {
    let status = this.props.item.status=='ACTIVE' ? 'PAUSED' : "ACTIVE" 
    await updateSubscription(this.props.item.id,status).then(res => {
    })

  }

    render() {
        let item = this.props.item
        if (this.state.loading) {
            return <ActivityIndicator size="small" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
        }
        return (
            <>
            <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:Config.baseColor}}>Subscription # </Text>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:"grey"}}>{this.props.item.id}</Text>
                </View>

                <View style={{alignSelf : 'center'}}>
                    <Chip>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{(this.props.item.status).toUpperCase()}</Text>
                    </Chip>
                </View>

            <View style={{flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between'}} >
                <View style={{paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:Config.secondColor}}>Start Time:</Text>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{moment(this.props.item.start_time).format('LL')}</Text>
                </View>

                <View style={{paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:Config.secondColor}}>End Time:</Text>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{moment(this.props.item.end_time).format('LL')}</Text>
                </View>
            </View>
                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>Time Slot:</Text>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{this.props.item.time_slot==1 ? 'Morning 9AM-11AM' : 'Evening 03PM-05PM'}</Text>
                </View>


                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5}}>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:`${Config.baseColor}`}}>SUBSCRIPTION PRODUCT:</Text>
                </View>

                    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{(item.product_detail.name).toUpperCase()}</Text>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{item.quantity}X</Text>
                    </View>


                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:10}}>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_medium`,color:`${Config.baseColor}`}}>TOTAL PRICE:</Text>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_medium`,color:`${Config.baseColor}`}}>{this.props.item.price}</Text>
                </View>


                <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems : 'center',paddingVertical:10}}>
                    <IconButton
                        style={{backgroundColor:`${Config.secondColor}`}} 
                        onPress={() => this.props.navigation.navigate("ChangeSubscription",{
                            item : item
                        })}
                        icon={() => <Entypo name="edit" size={20} color="white" />}
                        color="white"
                    />

                    <Button
                        onPress={() => createTwoButtonAlert(() => this.manageSubscription())}
                        icon={() => <MaterialIcons name="airplanemode-active" size={20} color={Config.secondColor} />}
                        color={Config.secondColor}
                        mode="outlined"
                    >
                        {item.status == "ACTIVE" ? 'PAUSE' : 'ACTIVATE'}
                    </Button>

                    <IconButton
                        style={{backgroundColor:`red`}} 
                        onPress={() => createTwoButtonAlert(() => this.props.deleteSubscription(item.id),1)}
                        icon={'delete'}
                        color="white"
                    />

                </View>

            </View>
            <Divider/>
            </>
        )}
}

export default Orders

const styles = StyleSheet.create({
    container : {
        margin: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 10
    }
})


function createTwoButtonAlert (func , del=false) {
    Alert.alert(
        "Take Action",
        `Are You Sure, you want to ${del ? 'delete' :'change status of'} subscription`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("cancelled"),
            style: "cancel"
          },
          { text: "OK", onPress: () => func() }
        ],
        { cancelable: false }
      );
}