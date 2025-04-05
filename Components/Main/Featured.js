import React from 'react'
import {View,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../../Constants';
import DrippingMilk from '../../SVGs/DrippingMilk';

const {width,height} = Dimensions.get("window")

class Featured extends React.Component {
    constructor() {
        super();
        this.state = {
            productsArr : [],
            loading : true
        }
    }

    async componentDidMount() {
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
                {/* <DrippingMilk style={{marginBottom:-220}} width={400} height={300} /> */}
            <View style={styles.container}>
                <Text style={{margin:10,fontFamily:`${Config.font}_bold`,fontSize:25,color:Config.secondColor}}>Popular</Text>
                <Text style={{margin:10,marginVertical:5,fontFamily:`${Config.font}`,fontSize:16,color:Config.secondColor}} >Checkout our hot,trendy items.</Text>
                <FlatList
                        style={{marginLeft:5}}
                        contentContainerStyle={{justifyContent:"space-evenly",alignItems:"center"}}
                        data={this.state.productsArr}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) => {
                            return(
                                <View>
                                    <TouchableOpacity style={styles.feaCard} 
                                    onPress={() => {
                                        let newItem = item.item;
                                        newItem.action = "all"
                                        this.props.setItem(newItem)
                                    }}
                                    >
                                        <Image source={{uri : item.item.image}} style={styles.image} />
                                        <View >
                                            <Text style={{fontSize:16,fontFamily:`${Config.font}_bold`,padding:10}}>{item.item.name}</Text>
                                            <Text style={{fontSize:16,fontFamily:`${Config.font}`,padding:10}}>Rs.{item.item.price}/{item.item.quantity}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                />
            </View>
            </View>
        )
    }
}

export default Featured

const styles = StyleSheet.create({
    image : {
        width : width*0.75,
        height : 150,
        resizeMode : "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //marginHorizontal: 5
    },
    feaCard : {
        borderRadius: 10,
        backgroundColor : "white",
        marginHorizontal: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        marginVertical:10,
        marginBottom:20
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
        backgroundColor :Config.secondaryColor
    }
})
