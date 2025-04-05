import React from 'react';
import {Flatlist,View,Text,TextInput, StyleSheet,Dimensions, ActivityIndicator} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import {searchProducts} from '../Services/Product'
import SearchProductTile from '../Components/ProductPage/SearchProductTile'
import { Config } from '../Constants';
import CategoryLoader from '../Components/Main/CategoryLoader';
import _ from 'lodash'

const {width} = Dimensions.get("window")

export default class SearchProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            search : "",
            products : []
        }
    }
    debouncedSearch = _.debounce(function () {
        searchProducts(this.state.search).then(res => {
        this.setState({
            products : res,
            loading : false
        })
    })},1000)

    searchItem =  (item) => {
        this.setState({search : item,loading : true})
        this.debouncedSearch()
    }
    render() {
        return (
            <View style={{paddingTop:30}}>
                <Text style={styles.title}>Search Products</Text>
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.searchItem(text)}
                        value={this.state.search}
                        clearButtonMode="while-editing"
                        style={styles.inputBox}
                        placeholder="Search Products"
                        inlineImageLeft="search"
                    />
                </View>
                {(this.state.loading==true ) ? <CategoryLoader /> : 
                <>
                {this.state.products.length ==0 ? <Text style={styles.no}>No Results can be found for this ...</Text> :
                    <FlatList 
                        numColumns={2}
                        data={this.state.products} 
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{justifyContent:'center'}}
                        style={{marginHorizontal:10, marginBottom : 200}}
                        renderItem={(item) => {
                            return(
                                <SearchProductTile item={item} navigation={this.props.navigation} />
                            )
                        }}
                    />
                }
                </>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox : {
        borderColor: '#4e4e4e',
        padding: 8,
        marginVertical: 5,
        marginHorizontal : 10,
        backgroundColor: "white",
        width: width*0.9,
        textAlign: "left",
        borderRadius : 4  ,
        backgroundColor : '#e9e8e8'
    },
    title : {
        fontSize: 30,
        fontFamily : `${Config.font}_bold`,
        padding : 10,
        color : `${Config.baseColor}`
    },
    no : {
        justifyContent : "center",
        alignItems : "center",
        textAlign : "center",
        textAlignVertical : "center",
        fontFamily : `${Config.font}_medium`,
        color : "grey"
    }
})