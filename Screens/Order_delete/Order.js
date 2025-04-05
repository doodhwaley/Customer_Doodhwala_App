import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import {addToCart} from '../../Services/Cart'
import { CommonActions } from '@react-navigation/native';
import Loader from '../../Components/Loader'



const {width,height} = Dimensions.get("window")


import { Avatar, Button, Chip } from 'react-native-paper';
import { Config } from '../../Constants';

class ProductPage extends React.Component {
    constructor() {
        super();
        this.state = {
            detail : {},
            loading : false,
            quantity : 1,
        }
    }

    async componentDidMount() {
        this.setState({
            detail : this.props.route.params.order.item,
            quantity : this.props.route.params.order.quantity,
        })
    }

    quantityHandler = (op) => {
        switch(op) {
            case '+' : return this.setState(prevState =>({
                            quantity : prevState.quantity+1
                        }))
            case '-' : return this.setState(prevState =>({
                            quantity : prevState.quantity>1 ? prevState.quantity -1 : 1
                        }))
        }
    }
    handleCart = async () => {
        var obj={};
        obj.id = this.state.detail.id
        obj.quantity = this.state.quantity
        obj.price = (this.state.detail.price- ((this.state.detail.price*this.state.detail.discount)/100))*this.state.quantity
        obj.name = this.state.detail.name

        await addToCart(obj).then(response => {
            this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Home' },
                  ],
                })
              );
        })
    }
    render() {
        if (this.state.loading) {
            return(
                <Loader visible={this.state.loading} />
            )
        }
        return(
            <View style={styles.container}> 

                <StatusBar color="white" />
                <View style={styles.header}>
                            <Text style={styles.title}>{this.state.detail.name}</Text>
                            <Avatar.Image 
                                source={{uri : this.state.detail.image}} 
                            />
                </View>
                <View style={styles.description}>
                    <Text 
                        style={{
                            fontFamily:`${Config.font}_bold`,
                            color : "white",
                            fontSize : 20
                        }}
                    >Product Detail</Text>

                    <View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <Text style={{color : Config.secondaryColor,fontFamily :`${Config.font}_medium` }} >Quantity:</Text>
                            <View style={styles.counter}>
                                <TouchableOpacity onPress={() => this.quantityHandler('-')}>
                                    <AntDesign name="minus" size={15} color="white" />
                                </TouchableOpacity>
                                    <Text style={{color:"white",fontSize:20}}>{this.state.quantity}</Text>
                                <TouchableOpacity onPress={() => this.quantityHandler('+')}>
                                    <AntDesign name="plus" size={15} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.pricing}>
                            <Text style={{fontFamily:`${Config.font}_bold`,color : Config.secondaryColor}}>Price:</Text>
                            <Chip 
                                textStyle={{color:"white",fontFamily:`${Config.font}`}}
                                style={{backgroundColor : Config.baseColor,paddingHorizontal : 8}}
                            >
                                Rs.{(this.state.detail.price- ((this.state.detail.price*this.state.detail.discount)/100))*this.state.quantity}
                            </Chip>
                        </View>

                    </View>
                </View>
                
                <Button mode="contained" theme={{ colors: { primary: Config.baseColor}}} icon="cart" labelStyle={{color : "white"}} style={styles.cart} onPress={() => this.handleCart()}>
                    Add to Cart
                </Button>
                
            </View>
        )
    }
}
export default ProductPage;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
        // justifyContent : "space-around"
    },
    image : {
        width : width*0.2,
        resizeMode:"cover",
        height: 70,
        borderRadius : width/2,
    },
    description : {
        marginVertical:10,
        backgroundColor:Config.secondColor,
        padding : 8,
        // shadowColor: 'grey',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 8,
        // elevation: 5,
    },

    title :{
        textAlign:"center",
        zIndex:10,
        color:Config.secondColor,
        fontFamily:`${Config.font}_bold`,
        fontSize: 20,
        alignSelf:"center"

    },
    header : {
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"space-between",
        alignItems:"center",
        margin : 30
    },
    pricing : {
        width : width*0.6,
        flexDirection : "row",
        alignSelf:"center",
        marginVertical:10,
        justifyContent : "space-around",
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
        width : "40%",
        justifyContent : "center",
        alignItems : "center",
        marginLeft:10,
        padding: 5
    },
    cart : {
        alignSelf:"center",
        padding : 8,
        alignItems:"center"
    }

})