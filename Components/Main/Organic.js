import React from 'react'
import {View,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../../Constants';

const {width,height} = Dimensions.get("window")

class Organic extends React.Component {
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
            <View style={{backgroundColor : Config.baseColor}} >
            <View style={styles.container}>
                <Text style={{margin:10,fontFamily:`${Config.font}_bold`,fontSize:25,color:Config.baseColor}}>Organic Products</Text>
                <Text style={{margin:10,marginVertical:5,fontFamily:`${Config.font}`,fontSize:16,color:Config.baseColor}} >Finest products for healthy, organic living.</Text>
                <FlatList
                    columnWrapperStyle={{justifyContent:"space-around"}}
                    data={this.state.productsArr}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    renderItem={(item) => {
                        return(
                            <View>
                                <TouchableOpacity 
                                    style={styles.catCard}
                                    onPress={() => 
                                        this.props.navigation.navigate("CategoryStack",{
                                            screen: "Categories",
                                            params : {
                                                category : item.item,
                                                categoryName:item.item.name
                                            }
                                        })
                                    }
                                >
                                    <View>
                                        <Image source={{uri : item.item.image}} style={styles.image} />
                                    </View>
                                    <View style={{paddingVertical:10,alignItems :"center"}} >
                                        <Text style={{fontSize:13,textAlign:"left",fontFamily:`${Config.font}_medium`}}>{item.item.name}</Text>
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

export default Organic

const styles = StyleSheet.create({
    image : {
        resizeMode:"cover",
        width:width*0.9/3,
        height:50,
        alignSelf : "center",
        borderTopLeftRadius :10,
        borderTopRightRadius :10,
    },
    catCard : {
        backgroundColor : "white",
        width: width*0.9/3,
        // flexDirection : "row",
        borderRadius : 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
        marginBottom:20,
        alignItems : 'center',
        justifyContent : 'center',
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
        backgroundColor :Config.secondaryColor,
        paddingBottom : 20
    }
})
