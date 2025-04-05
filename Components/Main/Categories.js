import React from 'react'
import {View,FlatList,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../../Constants';
import {getCategories} from '../../Services/mainPage'
import MainLoader from './MainLoader';

const {width,height} = Dimensions.get("window")

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {
            categoriesArr : [],
            loading : true
        }
    }

    async componentDidMount() {
        this.setState({
            categoriesArr : this.props.data,
            loading : false
        })
    }
    render() {
        if (this.state.loading) {
            return(<MainLoader />)
        }
        return (
            <View style={styles.container} >
                <Text style={{margin:10,fontFamily:`${Config.font}_bold`,fontSize:25,color:Config.secondaryColor }}>Categories</Text>
                <View>
                    <FlatList
                        columnWrapperStyle={{justifyContent:"space-around"}}
                        data={this.state.categoriesArr}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        renderItem={(item) => {
                            return(
                                <View>
                                    <TouchableOpacity 
                                        style={styles.catCard}
                                    onPress={() => this.props.navigation.navigate("CategoryStack",
                                    {screen: "Categories",params : {category : item.item,categoryName:item.item.name}} )}>
                                        <View style={{width:"40%"}}>
                                            <Image source={{uri : item.item.image}} style={styles.image} />
                                        </View>
                                        <Text style={{fontSize:15,textAlign:"left",width:"60%",paddingRight:5,alignSelf:"center",fontFamily:`${Config.font}`}}>{item.item.name}</Text>
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

export default Categories

const styles = StyleSheet.create({
    image : {
        resizeMode:"contain",
        width:30,
        height:30,
        alignSelf : "center"
    },
    catCard : {
        backgroundColor : "white",
        width: width*0.9/2,
        flexDirection : "row",
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
        minHeight : 50,
        alignItems : 'center'

    },
    container : {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.39,
        // shadowRadius: 8.30,

        backgroundColor :Config.baseColor,
        zIndex : 13,
        borderTopRightRadius : 20,
        borderTopLeftRadius : 20,
        paddingBottom : 50,
        paddingTop: 10,
        elevation : 13
    }
})
