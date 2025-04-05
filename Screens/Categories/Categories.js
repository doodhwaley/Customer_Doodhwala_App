import React from 'react'
import {View,Text, ActivityIndicator, StyleSheet,TouchableOpacity, Dimensions} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

//Here we import our components
import Header from '../../Components/Header'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { getSubCategoryDetail } from '../../Services/Category';
import Error from '../../SVGs/404'

import {
    Tabs,
    MaterialTabBar,
    CollapsibleProps,
} from 'react-native-collapsible-tab-view'
import CategoryDetail  from './CategoryDetail'
import { Config } from '../../Constants'



const {width} = Dimensions.get('window')



function CustomHeader (props) {
    let {category} = props.route.params || "Categories"
    return(
        <View style={styles.root} >
            <Text style={styles.text} >{category.name}</Text>
        </View>
    )
}


function CustomTab  (props) {
    return (
      <Tabs.Container
        renderHeader={() => <CustomHeader {...props} />}
        lazy
        snapThreshold={0.5}
        scrollEnabled
        TabBarComponent={(props) => <MaterialTabBar {...props} scrollEnabled />}
        {...props}
      >
        {props.data.map((subcategory,index) => {
          return (
            <Tabs.Tab name={subcategory.name} key={index}>
              <Tabs.ScrollView>
                <CategoryDetail {...props} subcategory={subcategory.id} />
              </Tabs.ScrollView>
            </Tabs.Tab>
          )
        })}
      </Tabs.Container>
    )
  }


function Categories(props) {
    const [data,setData] = React.useState({})
    const [loading,setLoading] = React.useState(true)
    let {category} = props.route.params
    React.useEffect(() => {
        (async () => {
            getSubCategoryDetail(category.id || 1).then(res => {
                setData((res))
                setLoading(false)
            })
        })()
    },[])

    let insets = useSafeAreaInsets();
    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
    }
    return (
        <>
        <View style={{paddingTop:insets.top,backgroundColor : "white"}}></View>
        <Header navigation={props.navigation} title={"Category"} />
            {data.length >0 ?
                <CustomTab
                    data={data}
                    {...props}
                /> 
                
                :
                <View style={{justifyContent : 'center',alignItems : "center"}} >
                    <Error width={width *0.9} />
                    <Text>Currently, There is No Product in In this Category</Text>
                </View>
            }
        </>
    )
}

export default Categories


const styles = StyleSheet.create({
    root: {
      backgroundColor: Config.secondColor,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    text: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
      fontFamily : `${Config.font}_bold`,
      paddingRight : 5
    },
  })