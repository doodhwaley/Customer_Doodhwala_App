import React from 'react'
import {View,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../../Constants';
import BreakFastWaves from '../../SVGs/BreakFastWaves';
import DrippingMilk from '../../SVGs/DrippingMilk';

const {width,height} = Dimensions.get("window")

class BreakFast extends React.Component {
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
                {/* <BreakFastWaves style={{marginTop:-110,marginBottom:-100}} width={400} height={300} /> */}
            <View style={styles.container}>
                <Text style={{margin:10,fontFamily:`${Config.font}_bold`,fontSize:25,color:Config.secondaryColor}}>Breakfast Essentials</Text>
                <Text style={{margin:10,marginVertical:5,fontFamily:`${Config.font}`,fontSize:16,color:Config.secondaryColor}} >Wanna Make Best out of Your Breakfast? Try these !</Text>
                <FlatList
                    columnWrapperStyle={{justifyContent:"flex-start"}}
                    data={this.state.productsArr}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    contentContainerStyle={{marginVertical :20,marginHorizontal:2}}
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
                                        <Text style={{fontSize:13,color : Config.secondaryColor,textAlign:"center",fontFamily:`${Config.font}_medium`}}>{item.item.name}</Text>
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

export default BreakFast

const styles = StyleSheet.create({
    image : {
        resizeMode:"cover",
        width:width*0.95/3,
        height:100,
        alignSelf : "center",
        borderTopLeftRadius :4,
        borderTopRightRadius :4,
    },
    catCard : {
        // backgroundColor : "white",
        width: width*0.95/3,
        // flexDirection : "row",
        borderTopLeftRadius :4,
        borderTopRightRadius :4,
        // elevation: 13,
        alignItems : 'center',
        justifyContent : 'center',
        marginVertical : 10,
        marginHorizontal : 2
    },
    container : {
        backgroundColor :Config.baseColor,
        paddingBottom : 30
    }
})
