import AsyncStorage from '@react-native-async-storage/async-storage';
import { indexOf } from 'lodash';
import {Alert} from 'react-native'
import { cartState } from '../State/CartState'

//Here is the base API
import axios from './API'

export function calculateOrderPrice(cartArr) {
    let price=0;
    for (let i in cartArr) {
        price += (cartArr[i].price)
    }
    return price
}

function search(id, cartArr){
    for (var i=0; i < cartArr.length; i++) {
        if (cartArr[i].id === id) {
            return i;
        }
    }
    return -1
}


export async function addToCart(orderObject) {
    var cartArr = cartState.get()
    if (cartArr == null) {
        cartArr = []
    }
    let temp = search(orderObject.id,cartArr);
    if (temp == -1) {
        cartArr.unshift(orderObject)
    }
    else {
        cartArr[temp].quantity += orderObject.quantity 
    }
    cartState.set(cartArr)
}

export async function readCart() {
    var cart = cartState.get()
    if (cart == null) {
        cart = []
    }
    let cartArr = (cart)
    let cartObj = {
        cartArr : cartArr,
        orderPrice : calculateOrderPrice(cartArr)
    }
    return cartObj
}

export async function deleteCartItem(index) {
    var cart = cartState.get()
    if (cart == null) {
        cart = []
    }
    let cartArr = (cart)
    cartArr.splice(index,1)
    cartState.set(cartArr)
}


export async function setItemQuantity(orderObject,q) {
    var cartArr = cartState.get();
    if (cartArr == null) {
        cartArr = [];
    }
    let temp = search(orderObject.id,cartArr);
    cartArr[temp].quantity = q;
    cartState.set(cartArr);
}
