import React from 'react'
import {View,Text,Button, ActivityIndicator, StyleSheet} from 'react-native'
import {orderSocket} from '../../Services/WebSocket'
import {getActiveOrders} from '../../Services/Order'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Config } from '../../Constants'

let chatsocket = orderSocket()

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            loading : true,
            guest : false
        }
    }
    
  async componentDidMount() {
    let guest = await AsyncStorage.getItem('guest');
    if (!(guest !=undefined || guest!=null)){
        getActiveOrders().then(res => {
            this.setState({data : (res),loading: false})

        })
        chatsocket.onmessage = function(e) {
            //const data = JSON.parse(e.data);
            getActiveOrders().then(res => {
                this.setState({data : (res)})
            })
        }.bind(this)

        chatsocket.onclose = function(e) {
        };
    }
    else {
        this.setState({guest :true})
    }
  }


    render() {

        if (this.state.guest) return null;

        if (this.state.loading) {
            return <ActivityIndicator size="large" color="green" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
        }
        return (

            <View style={styles.container}>
                <Text style={{color:`${Config.baseColor}`,fontFamily:`${Config.font}_medium`}}>Active Orders</Text>
                <ScrollView>
                    {this.state.data && this.state.data?.map((item,index) => {
                        return(
                            <View key={index.toString()}>
                                <View style={styles.order}>
                                    <Text style={{color:"grey",fontSize:16,fontFamily :  `${Config.font}`}}>Order #{item.id}</Text>
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => this.props.navigation.navigate("OrderDetail",{order : item})}
                                    >
                                        <Text style={{color:"white",fontFamily :  `${Config.font}`}}>See Status</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )}
}

export default Orders


const styles = StyleSheet.create({
    container : {
        // margin:10,
        backgroundColor:"white",
        // borderRadius : 10,
        padding : 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        
        // elevation: 2,
    },
    order : {
        justifyContent:"space-between",
        flexDirection:'row',
        paddingVertical : 10,
        alignItems:"center"
    },
    button : {
        backgroundColor:`${Config.baseColor}`,
        padding : 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 4,
        margin: 5
    }
})