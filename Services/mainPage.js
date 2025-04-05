import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'
import {encode as btoa} from 'base-64'


export async function getCategories() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product-category/').then(async response => {
        await AsyncStorage.setItem('categories',JSON.stringify(response.data))
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
} 

export async function getCategoriesByTag(tag) {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product-category/?tag=' + tag).then(async response => {
        await AsyncStorage.setItem('categories',JSON.stringify(response.data))
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
} 


export async function getBanners() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/banner/').then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
} 

export async function getProducts() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product/').then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}

export async function getProductsFeatured() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product/?featured=true').then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}

export async function getProductsByTag(tag) {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product/?tag=' + tag).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}