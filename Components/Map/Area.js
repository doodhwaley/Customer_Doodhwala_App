import React from 'react'
import {StyleSheet, View, Text,TextInput,Dimensions, TouchableOpacity,Image,ScrollView, Alert} from 'react-native'
import {styles} from '../../styles/auth'
import {getAreas, getUserData, updateUser} from '../../Services/User'
import {Config} from '../../Constants'
import {Picker} from '@react-native-picker/picker'
import { getCities, getSubAreas, updateSubArea } from '../../Services/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { customerState } from '../../State/Customer'

export default function Area(props) {
    
    const [cities,setCities] = React.useState(null);
    const [areas,setAreas] = React.useState(null);
    const [address,setAddress] = React.useState(null);
    const [subareas,setSubAreas] = React.useState(null);
    const [city,setCity] = React.useState(null);
    const [area,setArea] = React.useState(null);
    const [subarea,setSubArea] = React.useState(null);


    let data = customerState.useValue()
    React.useEffect(() => {
        (async() => {
            await getUserData();
            getCities().then(res => setCities(res));
            setCity(data.subarea_detail.area_detail.city)
            if (data.subarea_detail.area_detail.city != null)
                getAreas(data.subarea_detail.area_detail.city).then(res => {
                    setAreas(res)
                    setAddress(data.user.address)
                    setArea(data.subarea_detail.area)
                    getSubAreas(data.subarea_detail.area).then(res => {
                        setSubAreas(res)
                        setSubArea(data.subarea_detail.id)
                    });
                });
        })()
    },[props.loading])

    const setLocationFun = () => {
        props.setLoading(true)
        props.coordFun(address).then(() => {
            updateSubArea(subarea).then(res => {
                props.setLoading(false)
            }).
            catch(e => Alert.alert(e.message))
        })
    }

    return(
        <>
            <View>
                <Picker
                    selectedValue={city}
                    onValueChange={itemValue => {
                    setCity(itemValue)
                    if (itemValue != null)
                        getAreas(itemValue).then(res => setAreas(res));
                    }}
                    itemStyle={{height: 30, fontFamily:`${Config.font}`,color:`${Config.baseColor}`,transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
                    dropdownIconColor={`${Config.baseColor}`}
                    mode="dropdown"
                >
                    <Picker.Item  label='Select your City' value={null} />
                    { cities?.map((item,index) => {
                    return(
                        <Picker.Item  label={item.name} value={item.id} key={index} />
                    )
                    })
                    }
                </Picker>
            </View>

            <View>
                <Picker
                    selectedValue={area}
                    onValueChange={itemValue => {
                    setArea(itemValue)
                    if (itemValue !=null)
                        getSubAreas(itemValue).then(res => setSubAreas(res));
                    }}
                    itemStyle={{height: 30, fontFamily:`${Config.font}`,color:`${Config.baseColor}`,transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
                    dropdownIconColor={`${Config.baseColor}`}
                    mode="dropdown"
                >
                    <Picker.Item  label='Select your Area' value={null} />
                    { areas?.map((item,index) => {
                        return(
                        <Picker.Item  label={item.name} value={item.id} key={index} />
                        )
                    })
                    }
                </Picker>
            </View>

            <View>
                <Picker
                    selectedValue={subarea}
                    onValueChange={itemValue => setSubArea(itemValue)}
                    itemStyle={{height: 30, fontFamily:`${Config.font}`,color:`${Config.baseColor}`,transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
                    dropdownIconColor={`${Config.baseColor}`}
                    mode="dropdown"
                >
                    <Picker.Item  label='Select your Sub Area' value={null} />
                    { subareas?.map((item,index) => {
                    return(
                        <Picker.Item  label={item.name} value={item.id} key={index} />
                    )
                    })
                    }
                </Picker>
            </View>

            <View style={styles.input}  >
                <TextInput
                value={address}
                style={styles.inputBox}
                onChangeText={text=> setAddress(text)}
                placeholderTextColor="grey"
                placeholder="Street and House Number"
                />                 
            </View>

            <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingVertical:10}}>
                    <TouchableOpacity style={{backgroundColor:`${Config.baseColor}`,padding:8,borderRadius : 5,elevation : 13}} onPress={setLocationFun}>
                        <Text style={{color:"white"}}>Set Location</Text>
                    </TouchableOpacity>
            </View>
        </>
    )
}