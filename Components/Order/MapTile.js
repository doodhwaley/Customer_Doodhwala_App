import React from 'react'
import {View,Text,Alert, ActivityIndicator, StyleSheet} from 'react-native'
import {getOrderProducts,updateOrder,updateOrderCancel} from '../../Services/Order'
import moment from 'moment'
import { Config } from '../../Constants'
import { Avatar, Chip, Divider, IconButton } from 'react-native-paper'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import CancelOrder from '../Sheets/CancelOrder';
import Loader from '../../Components/Loader'
class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            loading : true,
            price : 1,
            visible : false
        }
    }
    
  async componentDidMount() {
    await getOrderProducts(this.props.item.id).then((res) => {
        this.setState({
            products : res,
            loading : false,
            completed : false
        })
    })

  }

  updateOrderStatus = async() => {
    await updateOrder(this.props.item.id).then(res => {
        this.props.navigation.replace("Home")
    })
  }

  manageOrder =  async () => {
      switch(this.props.item.payment_method) {
          case 'CASH': {
              Alert.alert("Pay the Price",`Please Pay Rs.${this.props.item.price} to the Delivery Boy. Thanks You!`,
              [
                {
                    text: "Cancel",
                    onPress: () => console.log("cancelled"),
                    style: "cancel"
                },
                {   text: "OK",
                    onPress: () => this.updateOrderStatus()
                }
              ])
              break;
          }
          default : {
              this.updateOrderStatus()
              break;
          }

      }
  }

  cancelOrder = async() => {
    // await updateOrderCancel(this.props.item.id).then(res => {
    //     Alert.alert("Cancelled","Your Order was Cancelled Successfully",[
    //         {
    //             text : "OK",
    //             onPress : () => this.props.navigation.replace("Home") 
    //         }
    //     ])
    // })
    this.setState({visible : true})
  }

    render() {
        if (this.state.loading) {
            return <Loader visible={this.state.loading} />
        }
        return (
            <View style={styles.container}>

                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-evenly",alignItems : "center"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>Payment Method:</Text>
                    {(this.props.item.payment_method).toUpperCase() == "CASH" ? (
                        <Chip 
                            icon="cash"
                            textStyle= {{
                                color : "green"
                            }}
                            mode="outlined"
                        >CASH</Chip>
                    ): (
                        <Avatar.Image size={40} source={require("../../assets/images/jazz.jpg")} />
                    )}
                </View>

                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>Date:</Text>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{moment(this.props.item.created_at).add(1,'day').format('LL')}</Text>
                </View>

                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5}}>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_bold`,color:`${Config.baseColor}`}}>ORDER PRODUCTS:</Text>
                </View>

                {this.state.products.map((product,index) => {
                    return(
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal : 10}}>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:Config.secondColor}}>{(product.product_detail.name).toUpperCase()}</Text>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{product.quantity}X</Text>
                    </View>
                    )
                })}
                <View style={{marginTop : 10}} />
                <Divider />
                <View style={{flexDirection:"row",justifyContent:"space-around",paddingVertical:10}}>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_bold`,color:`${Config.baseColor}`}}>TOTAL:</Text>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_medium`,color:`${Config.baseColor}`}}>Rs.{this.props.item.price}</Text>
                </View>


                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    {this.props.orderTrack   && (
                    <IconButton 
                        style={{backgroundColor:`${Config.secondColor}`}} 
                        onPress={() => this.props.navigation.navigate("Chat",{
                            order : this.props.item
                        })}
                        icon="message"
                        color="white"
                    />
                        )
                    }
                    {this.props.orderTrack   && (    
                    <IconButton style={{backgroundColor:`${Config.secondColor}`}} 
                        onPress={() => createTwoButtonAlert(() => this.manageOrder(this.props.item.price))}
                        icon={() => <Feather name="check-circle" size={24} color="white" />}
                    />
                        )
                    }

                    <IconButton 
                        style={{backgroundColor:`${Config.secondColor}`,paddingHorizontal:10,alignSelf:"center"}} 
                        onPress={() => createTwoButtonAlertCancel(() => this.cancelOrder())}
                        icon={() => <MaterialIcons name="cancel" size={15} color="white" />}
                    />
                </View>
                <CancelOrder 
                    navigation={this.props.navigation}
                    item={this.props.item}
                    visible={this.state.visible}
                    setVisible={(item) => this.setState({visible : item}) }
                    setLoading={(item) => this.setState({loading : item})}
                />
            </View>
        )}
}

export default Orders

const styles = StyleSheet.create({
    container : {
        // marginVertical: 10,
        // shadowColor: 'grey',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 8,
        // elevation: 5,
        backgroundColor : "white",
        paddingHorizontal : 10,
    }
})


function createTwoButtonAlert (func) {
    Alert.alert(
        "Complete the current order",
        "Are you sure you want to mark the order as complete?",
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

function createTwoButtonAlertCancel (func) {
    Alert.alert(
        "Cancel The Order",
        "Are you sure you want to cancel the current order?",
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