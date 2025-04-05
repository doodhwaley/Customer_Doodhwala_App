import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions, Alert} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {subscribe} from '../Services/Order'

import moment from 'moment'


const {width,height} = Dimensions.get("window")


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '../Constants';
import CustomButtonAuth from '../Components/AuthStack/CustomButton';
import Counter from '../Components/Counter/Counter';
import { Avatar } from 'react-native-paper';

class Subscribe extends React.Component {
    constructor() {
        super();
        this.state = {
            detail : {},
            loading : false,
            quantity : 1,
        }
    }
    componentDidMount() {
        this.setState({
            detail : this.props.route.params.order.item,
            quantity : this.props.route.params.order.quantity,
            subscriptionType: this.props.route.params.order.subscriptionType2,
            startTime : this.props.route.params.order.startTime,
            endTime : this.props.route.params.order.endTime,
            time_slot : this.props.route.params.order.time_slot,
            subscription : this.props.route.params.order.subscription,
            payment_method : this.props.route.params.order.payment_method,
        })
    }


    loginFun =async ()=> {
        await AsyncStorage.clear();
        this.props.navigation.replace("AuthStack",{screen : "Login"})
    }

    handleSubscribe = async () => {
        let guest = await AsyncStorage.getItem('guest');
        if (!(guest !=null || guest!=undefined)){
            var obj={};
            obj.id = this.state.detail.id
            obj.quantity = this.state.quantity
            obj.price = this.state.detail.price*this.state.quantity
            obj.subscription = this.state.subscription
            obj.startTime = this.state.startTime
            obj.endTime = this.state.endTime
            obj.time_slot = this.state.time_slot
            obj.payment_method = this.state.payment_method
            obj.interval = this.state.subscriptionType.interval
            await subscribe(obj).then(response => {
                Alert.alert("Successfully Subscribed")
                this.props.navigation.navigate("Home")
            })
        }
        else {
            Alert.alert("Login Please","You need to login to Continue!", 
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Login", onPress: () => this.loginFun() }
                ]
            )
        }
    }
    render() {
        if (this.state.loading) {
            return(
                <View>
                    <ActivityIndicator size="large" color="red" style={{justifyContent:"center",alignItems:"center"}}/>
                </View>
            )
        }
        return(
            <View style={styles.container}> 

                <StatusBar color="white" />

                <View style={styles.header}>
                    <Text style={styles.title}>{this.state.detail.name}</Text>
                    <Avatar.Image source={{uri : this.state.detail.image}} />
                </View>

                <View style={styles.description}>

                    <Text style={styles.headline}>Subscription Detail</Text>
                    
                    <View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                            <Text style={{fontFamily:`${Config.font}`}}>Quantity:</Text>
                            <Text style={{fontFamily:`${Config.font}`}}>{this.state.quantity}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                            <Text style={{fontFamily:`${Config.font}`}}>Time Slot:</Text>
                            <Text style={{fontFamily:`${Config.font}`}}>{this.state.time_slot==1 ? 'Morning 9AM-11AM' : 'Evening 03PM-05PM'}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                            <Text style={{fontFamily:`${Config.font}`}}>Start Time:</Text>
                            <Text style={{fontFamily:`${Config.font}`}}>{moment(this.state.startTime).format('LL')}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                            <Text style={{fontFamily:`${Config.font}`}}>End Time:</Text>
                            <Text style={{fontFamily:`${Config.font}`}}>{moment(this.state.endTime).format('LL')}</Text>
                        </View>

                        <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                            <Text style={{fontFamily:`${Config.font}`}}>Payment Method:</Text>
                            <Text style={{fontFamily:`${Config.font}`}}>{this.state.payment_method}</Text>
                        </View>

                        
                        {this.state.detail.can_subscribe &&
                        <>
                            <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                                <Text style={{fontFamily:`${Config.font}`}}>Subscription Name:</Text>
                                <Text style={{fontFamily:`${Config.font}`}}>{this.state.subscriptionType.name}</Text>
                            </View>
                        </>
                        }


                        <Counter 
                            quantity={this.state.quantity}
                            selected={this.state.detail}
                            setQuantity={item => this.setState({quantity : item})}
                        />

                    </View>
                </View>
                
                <CustomButtonAuth 
                    onPress={() => this.handleSubscribe()}
                    title="Subscribe"
                />
                    
                
            </View>
        )
    }
}
export default Subscribe;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },
    image : {
        width : width*0.2,
        resizeMode:"cover",
        height: 70,
        borderRadius : width/2,
    },
    description : {
        backgroundColor:"white",
        padding : 8,
        paddingVertical : 30
    },

    title :{
        textAlign:"center",
        zIndex:10,
        color:Config.secondaryColor,
        fontFamily:`${Config.font}_bold`,
        fontSize: 20,
        alignSelf:"center"


    },
    header : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding : 30,
        backgroundColor : Config.secondColor
    },
    pricing : {
        width : width*0.6,
        flexDirection : "row",
        alignSelf:"center",
        marginVertical:10,
        justifyContent : "center",
        alignItems : "center"
    },
    counter : {
        flexDirection:"row",
        borderRadius: width*0.8/2,
        borderWidth : 2,
        borderColor : "white",
        padding : 1,
        backgroundColor : `${Config.baseColor}`,
        width: "40%",
        justifyContent:"space-around",
        alignItems:"center"
    },
    price : {
        backgroundColor : `${Config.baseColor}`,
        borderRadius: width/2,
        width : "60%",
        justifyContent : "center",
        alignItems : "center",
        marginLeft:10,
        padding: 5
    },
    cart : {
        alignSelf:"center",
        backgroundColor : `${Config.baseColor}`,
        flexDirection : "row",
        padding : 8,
        borderRadius: 2,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 13,
        borderRadius : 10
    },
    cell : {flexDirection:"row",justifyContent:"space-around",paddingTop:10},
    headline : {
        fontFamily:`${Config.font}_bold`,
        color : Config.baseColor,
        fontSize : 20,
        alignSelf : "center"
    }

})