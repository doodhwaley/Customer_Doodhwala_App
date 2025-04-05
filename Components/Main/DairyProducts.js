import React from 'react'
import {View,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../../Constants';
import WavyHeader from '../../SVGs/WavyHeader';

const {width,height} = Dimensions.get("window")

class DairyProducts extends React.Component {
    constructor() {
        super();
        this.state = {
            productsArr : [],
            loading : true
        }
    }

    componentDidMount() {
        this.setState({
            productsArr : this.props.data,
            loading : false
        })
    }
    render() {
        if (this.state.loading) {
            return(
                <View>
                    <ActivityIndicator size="large" color="green" style={{justifyContent:"center",alignItems:"center"}}/>
                </View>
            )
        }
        return (
            <View style={{backgroundColor : 'white'}} >
            <WavyHeader style={{marginTop :-20,marginBottom:-220}} width={400} height={300} />
            <View style={styles.container}>
                <Text style={{margin:10,fontFamily:`${Config.font}_bold`,fontSize:25,color:Config.secondaryColor }}>Doodhwaley Special</Text>
                <Text style={{margin:10,marginVertical:5,fontFamily:`${Config.font}_medium`,fontSize:16,color:Config.secondaryColor}} >Quality Above Everything. Check out our dairy variety to relish the true purity</Text>
                <FlatList
                        style={{marginHorizontal:5}}
                        contentContainerStyle={{justifyContent:"space-evenly",alignItems:"center"}}
                        data={this.state.productsArr}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) => {
                            item.quantity = 0;
                            return(
                                <View style={styles.product}>
                                    <Image source={{uri : item.item.image}} style={styles.image} />
                                    <View style={styles.body}>
                                        <View style={{paddingHorizontal:10}}>
                                            <Text style={{fontSize:12,color:"grey",fontFamily:"Roboto",fontSize :13}}>{item.item.subcategory_detail.name}</Text>
                                            <Text style={styles.name}>{item.item.name}</Text>
                                            <Text style={styles.quantity}>{item.item.quantity}</Text>
                                            <View style={{flexDirection  : 'row'}} >
                                                <Text style={{...styles.price,
                                                    textDecorationLine: item.item.discount != 0 ? 'line-through' : 'none'
                                                }}>Rs.{item.item.price}</Text>
                                                {item.item.discount!= 0 && <Text style={{...styles.price}}> Rs.{item.item.price - ((item.item.price/100)*item.item.discount)}</Text>}
                                            </View>
                                            {item.item.can_subscribe && (
                                                <TouchableOpacity style={styles.subscribe} 
                                                    onPress={() => {
                                                        let newItem = item.item;
                                                        newItem.action = "subscribe"
                                                        this.props.setItem(newItem)
                                                    }}
                                                >
                                                    <Text style={{color:"white",fontSize :12}}>Subscribe</Text>
                                                </TouchableOpacity>
                                            )}

                                        </View>
                                        <TouchableOpacity style={styles.buyOnce} 
                                            // onPress={() => this.props.navigation.navigate("Order",{order : item})}
                                            onPress={() => {
                                                let newItem = item.item;
                                                newItem.action = "buy"
                                                this.props.setItem(newItem)
                                            }}
                                        >
                                            <Text>BUY ONCE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                />
                <View style={{padding: 10}} />
                {/* <ProductSheet/> */}
            </View>
            </View>
        )
    }
}

export default DairyProducts

const styles = StyleSheet.create({
    image : {
        width : 70,
        height : 70,
        resizeMode : "cover",
        marginHorizontal: 5,
        alignSelf : "center",
        marginVertical: 10
    },
    product : {
        width : width*0.42,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 13,
        backgroundColor:"white",
        margin : 5,
        borderRadius : 5,
        marginHorizontal:8,
        zIndex : 15
    },
    body : {
        paddingTop : 10,
        paddingHorizontal:0
    },
    name : {
        fontSize : 20,
        fontFamily : `${Config.font}_bold`
    },
    quantity : {
        color : "grey",
        paddingTop : 8
    },
    price : {
        fontWeight : "800",
        fontSize : 13,
        fontFamily : `${Config.font}_bold`
    },
    subscribe : {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : `${Config.baseColor}`,
        marginVertical : 8,
        paddingVertical : 4,
        borderRadius : width/2
    },
    buyOnce : {
        paddingVertical : 8,
        borderWidth : 0.5,
        borderColor : "grey",
        justifyContent :"center",
        alignItems : "center",
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,

    },
    container : {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.39,
        // shadowRadius: 8.30,

        // elevation: 13,
        backgroundColor :Config.secondColor,
        paddingBottom : 20
    }
})
