import React from 'react';
import {View,Text,Button,ActivityIndicator, StyleSheet,Dimensions, Alert} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {readCart,deleteCartItem} from '../Services/Cart'
import {checkout,orderProductPush} from '../Services/Order'
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../Components/Loader'


const {width,height} = Dimensions.get("window")

//Here we import the components

import { TouchableOpacity } from 'react-native-gesture-handler';
import { customerState } from '../State/Customer';
import { Config } from '../Constants';

class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
            orders : [],
            loading : true,
            payment_method : null,
            data : [],
            time_slot : null,
            visible : false
        }
    }
    async componentDidMount() {
        await readCart().then(async cartObj => {
            this.setState({loading : false,data : cartObj.cartArr,total : cartObj.orderPrice})
        })
        
    }

    addToBackend = async() => {
        this.setState({visible : true})
        await checkout(this.state.total,this.state.payment_method,this.state.time_slot).then(async res => {
            let cartArr = this.state.data
            for (var i in cartArr) {
                await orderProductPush(res,cartArr[i]).then((res) => {
                    deleteCartItem(cartArr[i])
                })
        
            }
            this.setState({visible : false})
        })
    }

    loginFun =async ()=> {
        await AsyncStorage.clear();
        this.props.navigation.replace("AuthStack",{screen : "Login"})
    }

    handleCheckout =  async() => {
        let guest = await AsyncStorage.getItem('guest');
        if (!(guest !=null || guest!=undefined)){
            if (this.state.payment_method !== null && this.state.time_slot !==null) {
                if (this.state.payment_method === 'CASH') {
                    await this.addToBackend().then(() => {
                        this.props.navigation.replace("DrawerRoutes",{screen:"MyTabs"})                     
                    })
                }
                else if (this.state.payment_method === 'JAZZ') {
                    let user = customerState.get()
                    if (user.balance < this.state.total) {
                        Alert.alert(
                            "Ewallet", 
                            "You don't have enough Balance in Ewallet Yet. Please Recharge to Continue.",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => this.props.navigation.navigate("Wallet") }
                            ]
                        )
                    }
                    else {
                        await this.addToBackend().then(() => {
                            this.props.navigation.replace("DrawerRoutes",{screen:"MyTabs"})                   
                        })
                    }
                }
            }
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
                <Loader visible={this.state.loading}  />
            )
        }
        return(
            <View style={styles.container}> 
                <StatusBar color="white" />
                <Text style={styles.title} >Finalize Bill</Text>
                <View style={styles.description}>
                    <Text style={{fontFamily:`${Config.font}_bold`,color : Config.baseColor}}>Transaction Details</Text>
                    <View>
                        <View>
                            <Picker
                                selectedValue={this.state.time_slot}
                                onValueChange={itemValue => this.setState({time_slot: itemValue})}
                                style={{width:width*0.8}}
                                itemStyle={{height: 30, fontFamily:`${Config.font}`,color:Config.baseColor,transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
                                dropdownIconColor={Config.baseColor}
                                mode="dropdown"
                            >
                                <Picker.Item  label='Select your Time Slot' value={null} key={0} />
                                <Picker.Item  label={'Morning 9AM-11AM'} value={1} key={1} />
                                <Picker.Item  label={'Evening 03PM-05PM'} value={2} key={1} />
                            </Picker>
                        </View>
                        <View >
                            <Picker
                                selectedValue={this.state.payment_method}
                                onValueChange={itemValue => this.setState({payment_method: itemValue})}
                                style={{width:width*0.8}}
                                itemStyle={{height: 30, fontFamily:`${Config.font}`,color:Config.baseColor,transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
                                dropdownIconColor={Config.baseColor}
                                mode="dropdown"
                            >
                                <Picker.Item  label='Select your Payment Method' value={null} key={0} />
                                <Picker.Item  label={'CASH ON DELIVERY'} value={'CASH'} key={1} />
                                <Picker.Item  label={'Ewallet'} value={'JAZZ'} key={1} />
                            </Picker>
                        </View>


                        <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5,paddingHorizontal:5}}>
                            <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:Config.baseColor}}>BILL PRODUCTS:</Text>
                        </View>

                        {this.state.data?.map((product,index) => {
                            return(
                            <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
                                <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{(product.name).toUpperCase()}</Text>
                                <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{product.quantity}
                                    <Text style={{color:Config.baseColor}}>X</Text>
                                </Text>
                            </View>
                            )
                        })}

                        <View style={{marginHorizontal: 5,flexDirection:"row",justifyContent:"space-between",marginVertical:5}}>
                            <Text style={{fontSize: 16,fontFamily:`${Config.font}_bold`,color:Config.baseColor}}>Price:</Text>
                            <Text style={{fontSize: 16,fontFamily:`${Config.font}`,color:Config.baseColor}}>Rs. {this.state.total}</Text>
                        </View>

                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleCheckout()}>
                        <Text style={{color:"white"}}>Confirm Bill</Text>
                    </TouchableOpacity>
                </View>
                <Loader visible={this.state.visible} />
            </View>
        )
    }
}
export default Checkout;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },
    description : {
        margin:10,
        backgroundColor:"white",
        borderRadius : 2,
        padding : 8,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
    },

    title :{
        textAlign:"center",
        zIndex:10,
        color:`${Config.baseColor}`,
        fontFamily:`${Config.font}_bold`,
        fontSize: 20,
        alignSelf:"center",
        paddingVertical : 20

    },
    button : {
        backgroundColor : `${Config.baseColor}`,
        alignSelf : "center",
        paddingHorizontal: 20,
        paddingVertical : 10,
        borderRadius : 2,
        zIndex : 10,
        left : 10,
        alignItems : "center",
        justifyContent : "center",
        marginVertical : 20
    }
})