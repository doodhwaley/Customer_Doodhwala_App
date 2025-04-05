import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'

export async function getNotifications() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/notification/' ,{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}