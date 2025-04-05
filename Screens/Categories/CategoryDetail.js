import React from 'react'
import {View, StyleSheet,Dimensions,Text,FlatList,Image,TouchableOpacity} from 'react-native'
//Here we import our components
import { getSubCategoryProducts} from '../../Services/Category'

import Error from '../../SVGs/404'
import { Paragraph } from 'react-native-paper'
import CategoryLoader from '../../Components/Main/CategoryLoader'
import { Config } from '../../Constants'

const {width,height} = Dimensions.get("window")


function Categories(props) {
    const [data,setData] = React.useState({})
    const [loading,setLoading] = React.useState(true)
    React.useEffect(() => {
            (async () => {
                await getSubCategoryProducts(props.subcategory || props.route.params.subcategory).then(async res => {
                    setData(res)
                    setLoading(false)
                })
            })()
        
    },[])
    if (loading) {
        return <CategoryLoader />
    }
    return (
        <View style={{backgroundColor : "white",flex:1}}>
            {data.length > 0 ?(
                    <FlatList
                        style={{marginBottom : 100}}
                        contentContainerStyle={{justifyContent:"space-between",alignItems:"center"}}
                        data={data}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        renderItem={(item) => {
                            item.quantity =0;
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
                                                <TouchableOpacity style={styles.subscribe} onPress={() => props.navigation.navigate("ProductPage",{
                                                    id : item.item.id
                                                })} >
                                                    <Text style={{color:"white"}}>Subscribe</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <TouchableOpacity style={styles.buyOnce} onPress={() => props.navigation.navigate("Order",{
                                                order : item
                                            })}>
                                            <Text>BUY ONCE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                />)
                : (
                <View style={{alignItems : "center",flex:1}} >
                    <Error width={200} height={200} />
                    <Paragraph style={{textAlign : "center"}} >Currently, There are no Products Available In This Category</Paragraph>
                </View>)}
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : "white",
    },
    tile : {
        margin: 10,
        marginVertical: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 20,
        justifyContent : "space-between",
        flexDirection : "row"
    },
    image : {
        width : 50,
        height : 50,
        resizeMode : "cover",
        marginHorizontal: 5,
        alignSelf : "center",
        marginVertical: 10
    },
    product : {
        width : width*0.4,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor:"white",
        margin : 10,
        borderRadius : 5,
        justifyContent : "space-between"
    },
    body : {
        paddingTop : 10,
        paddingHorizontal:0,
    },
    name : {
        fontSize : 18,
        fontFamily : `${Config.font}_bold`
    },
    quantity : {
        color : "grey",
        paddingTop : 8
    },
    price : {
        fontWeight : "800",
        fontSize : 13,
        fontFamily : `${Config.font}`
    },
    subscribe : {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : `${Config.baseColor}`,
        marginVertical : 5,
        paddingVertical : 4,
        borderRadius : width/2
    },
    buyOnce : {
        paddingVertical : 8,
        borderWidth : 0.5,
        borderColor : "grey",
        justifyContent :"center",
        alignItems : "center",
        textAlignVertical : 'bottom',
        marginTop:2
    }
})
