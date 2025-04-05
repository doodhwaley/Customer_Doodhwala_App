import React from 'react'
import {View,Text,Alert, ActivityIndicator, StyleSheet} from 'react-native'
import {getOrderProducts,updateOrder,updateOrderCancel} from '../../Services/Order'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import { Config } from '../../Constants'
import { Avatar, Chip } from 'react-native-paper'


class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            loading : true,
            price : 1,
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
        this.props.navigation.replace("MyTabs",{screen: "MainStack"})
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
    await updateOrderCancel(this.props.item.id).then(res => {
        Alert.alert("Cancelled","Your Order was Cancelled Successfully",[
            {
                text : "OK",
                onPress : () => this.props.navigation.replace("Home") 
            }
        ])
    })
  }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator size="small" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
        }
        return (
            <View style={styles.container}>
               {this.props.dontShow !=true && 
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:Config.baseColor}}>ORDER # </Text>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:"grey"}}>{this.props.item.id}</Text>
                </View>}

                <View style={{alignSelf : 'center'}}>
                    <Chip>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{(this.props.item.status).toUpperCase()}</Text>
                    </Chip>
                </View>

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


{ this.props.orderTrack &&
                <>
               <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>Distance Left:</Text>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{this.props.distance} kms</Text>
                </View>

                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>Time Left:</Text>
                    <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{this.props.duration} mins</Text>
                </View>
                </>
                }

                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5}}>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:`${Config.baseColor}`}}>ORDER PRODUCTS:</Text>
                </View>

                {this.state.products.map((product,index) => {
                    return(
                    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey",alignSelf : 'flex-start'}}>{(product.product_detail.name).toUpperCase()}</Text>
                        <Text style={{fontFamily:`${Config.font}_medium`,color:"grey"}}>{product.quantity}X</Text>
                    </View>
                    )
                })}

                <View style={{flexDirection:"row",justifyContent:"space-around",paddingVertical:10}}>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_medium`,color:Config.baseColor}}>TOTAL:</Text>
                    <Text style={{fontSize:16,fontFamily:`${Config.font}_medium`,color:Config.baseColor}}>Rs.{this.props.item.price}</Text>
                </View>

{this.props.orderTrack   && (
                <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingVertical:10}}>
                    <TouchableOpacity style={{backgroundColor:`${Config.baseColor}`,padding:8}} 
                        onPress={() => this.props.navigation.navigate("Chat",{
                            order : this.props.item
                        })}
                    >
                        <Text style={{color:"white"}}>Rider Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:`${Config.baseColor}`,padding:8}} 
                        onPress={() => createTwoButtonAlert(() => this.manageOrder(this.props.item.price))}
                    >
                        <Text style={{color:"white"}}>Mark as Complete</Text>
                    </TouchableOpacity>


                </View>
)
            }
                    {this.props.cancel != false &&
                    <TouchableOpacity style={{backgroundColor:`${Config.baseColor}`,padding:8,paddingHorizontal:10,alignItems:'center',marginVertical:5,alignSelf:"center"}} 
                        onPress={() => createTwoButtonAlertCancel(() => this.cancelOrder())}
                    >
                        <Text style={{color:"white"}}>Cancel Order</Text>
                    </TouchableOpacity>}

                <View style={{paddingVertical:10}}>
                    <Text style={{fontSize:12,fontFamily:`${Config.font}_medium`,color:Config.secondColor}}>{moment(this.props.item.created_at).add(1,'day').format('LL')}</Text>
                </View>
            </View>
        )}

}

export default Orders

const styles = StyleSheet.create({
    container : {
        // marginVertical: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 10,
        marginHorizontal : 5
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