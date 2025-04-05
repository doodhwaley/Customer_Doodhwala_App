import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'
import moment from 'moment';


//Here is the base API
import axios from './API'
import {encode as btoa} from 'base-64'
import { customerState } from '../State/Customer';



export async function placeOrder() {
    var cart = await AsyncStorage.getItem('cart')
    if (cart == null) {
        cart = "[]"
    }
    let cartArr = JSON.parse(cart)
    
}

export async function getSubscriptions() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/subscription/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}

export async function checkout(orderPrice,payment_method,time_slot){
    const token = await AsyncStorage.getItem('token')
    const customerData = await customerState.get()
    let body = {
        "customer" : customerData.id,
        "price" : orderPrice,
        "payment_method" : payment_method,
        "time_slot" : time_slot
    }
    return axios.post('/order/',body,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      let order_id = res.data.id 
      return order_id
    }).catch(e => {
      Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function orderProductPush(order_id,data){
    const token = await AsyncStorage.getItem('token')
    let body = {
        "order_id" : order_id,
        "quantity" : data.quantity,
        "product" : data.id,
    }
    return axios.post('/order-product/',body,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}
 /*         "start_time" : data.startTime,
"end_time" : data.endTime,
"buy_once" : data.subsciption >0 ? false : true,
 */

export async function subscribe(data){
    const token = await AsyncStorage.getItem('token')
    const customerData = await customerState.get()
    data.startTime = moment(data.startTime).startOf('day').toDate()
    data.endTime = moment(data.endTime).startOf('day').toDate()
    var last_delivered = moment(data.startTime).subtract(data.interval, 'day').toDate();

    let body = {
        "customer" : customerData.id,
        "store" : 1,
        "start_time" : data.startTime,
        "end_time" : data.endTime,
        "quantity" : data.quantity,
        "product_id" : data.id,
        "subscription" : data.subscription,
        "price" : data.price,
        "time_slot" : data.time_slot,
        "last_delivered" : last_delivered,
        "payment_method" : data.payment_method
    }
    return axios.post('/subscription/',body,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function getActiveOrders() {
    const token = await AsyncStorage.getItem('token')
    const customerData = await customerState.get()
    return axios.get('/order/?customer=' + customerData.id + '&status=ACTIVE' ,{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function getOrderProducts(id) {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/order-product/?order_id=' + id,{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}

export async function getOrderHistory() {
    const token = await AsyncStorage.getItem('token')
    const customerData = await customerState.get()
    return axios.get('/order/?customer=' + customerData.id + '&status=DELIVERED' ,{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function updateOrder(id) {
    const token = await AsyncStorage.getItem('token')
    axios
      .patch(`/order/${id}/`, {
          "user_complete" : true,
        },
  
        {
        headers : {
          "Authorization" : `Token ${token}`
        }
      })
      .then(res => {
        return (res.data);
      })
      .catch(err => Alert.alert(err.message,JSON.stringify(err.response.data)));
  }

  export async function updateOrderCancel(id,reason) {
    const token = await AsyncStorage.getItem('token')
    return axios
      .patch(`/order/${id}/`, {
          "status" : "CANCELLED",
          'reason' : reason
        },
  
        {
        headers : {
          "Authorization" : `Token ${token}`
        }
      })
      .then(res => {
        return (res.data);
      })
      .catch(err => Alert.alert(err.message,JSON.stringify(err.response.data)));
  }