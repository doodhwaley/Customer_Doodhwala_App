import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions,ImageBackground} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import Subscription from '../Components/ProductPage/Subscription'
import {SafeAreaView} from 'react-native-safe-area-context'



const {width,height} = Dimensions.get("window")


import {getProductDetail} from '../Services/Product'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../Constants';

class ProductPage extends React.Component {
    constructor() {
        super();
        this.state = {
            detail : {},
            loading : true,
            quantity : 1,
        }
    }
    async componentDidMount() {
        const id = this.props.route.params.id
        await getProductDetail(id).then(response => {
            this.setState({
                detail : response,
                loading : false
            })
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

    handleOrder = () => {
        let data = {}
        data.quantity = this.state.quantity,
        data.item = this.state.detail
        this.props.navigation.navigate("Order",{order : data})
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
            <SafeAreaView style={styles.container}> 

<ScrollView>
                    <ImageBackground source={{uri : this.state.detail.image}} style={styles.image} >
                        <View style={styles.header}>
                            <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                                <Ionicons style={{alignItems: 'flex-start',}} name="arrow-back" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.title}>{this.state.detail.name}</Text>
                            <View></View>
                        </View>
                    </ImageBackground>
                
                <View style={styles.pricing}>
                    <View style={styles.price}>
                        <Text style={{color:"white",fontFamily:`${Config.font}`}}>Rs.{this.state.detail.price*this.state.quantity}</Text>
                    </View>
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


                <View style={styles.description}>
                    <Text style={{fontFamily:`${Config.font}_bold`}}>Description</Text>
                    <Text>{this.state.detail.description}</Text>
                </View>

                {this.state.detail.can_subscribe==true ? <Subscription navigation={this.props.navigation} state={this.state}/> : null}

   {this.props.route.params.type == "full" &&
                        <View style={{alignItems:"center",marginTop: 10}} >
                        <TouchableOpacity style={{
                            backgroundColor : Config.secondColor,
                            width : width*0.75,
                            padding: 8,
                            justifyContent : 'center',
                            borderRadius : 4,
                            marginBottom : 30
                        }} onPress={() => this.handleOrder()} >
                            <Text style={{color: Config.secondaryColor, fontSize : 16,textAlign: "center",fontFamily: `${Config.font}_bold`}} >
                                ADD TO CART
                            </Text>
                        </TouchableOpacity>
                    </View>}
</ScrollView>
            </SafeAreaView>
        )
    }
}
export default ProductPage;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#eef2f5"
    },
    image : {
        width : width,
        height: 200,

    },
    description : {
        margin:10,
        backgroundColor:"white",
        borderRadius : 4,
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
        color:"white",
        fontFamily:`${Config.font}_bold`,
        fontSize: 30,
        alignSelf:"center"

    },
    header : {
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"space-between",
        alignItems:"center",
        margin: 30,
    },
    pricing : {
        width : width*0.6,
        flexDirection : "row",
        alignSelf:"center",
        marginVertical:10,
        justifyContent : "center"
    },
    counter : {
        flexDirection:"row",
        borderRadius: width*0.8/2,
        borderWidth : 2,
        borderColor : "white",
        padding : 7,
        backgroundColor : `${Config.baseColor}`,
        width: "60%",
        justifyContent:"space-around",
        alignItems:"center"
    },
    price : {
        backgroundColor : `${Config.baseColor}`,
        borderRadius: width/2,
        width : "40%",
        justifyContent : "center",
        alignItems : "center",
    },
    add : {
        bottom : 10,
        backgroundColor : `${Config.baseColor}`,
        padding : 10,
        borderRadius : width/2,
        right:10,
        justifyContent : "center",
        alignItems : 'center',
        width : '75%',
        alignSelf : "center",
        marginVertical : 20
    }
})