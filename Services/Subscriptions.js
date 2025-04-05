import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

//Here is the base API
import axios from './API';
import {encode as btoa} from 'base-64';

export async function getSubscriptions(customerId) {
  const token = await AsyncStorage.getItem('token');
  return axios
    .get('/subscription/?customer=' + customerId, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      Alert.alert(e);
    });
}

export async function deleteSubscription(id) {
  const token = await AsyncStorage.getItem('token');
  return axios
    .delete('/subscription/' + id + '/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      throw e;
    });
}

export async function updateSubscription(id, status) {
  const token = await AsyncStorage.getItem('token');
  axios
    .patch(
      `/subscription/${id}/`,
      {
        status: status,
      },

      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then(res => {
      return res.data;
    })
    .catch(err => Alert.alert(err.message, JSON.stringify(err.response.data)));
}

export async function updateSubscriptionTiming(id, obj) {
  const token = await AsyncStorage.getItem('token');
  axios
    .patch(
      `/subscription/${id}/`,
      {
        quantity: obj.quantity,
        price: obj.price,
        start_time: obj.start_time,
        end_time: obj.end_time,
        time_slot: obj.time_slot,
        payment_method: obj.payment_method,
      },

      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then(res => {
      return res.data;
    })
    .catch(err => Alert.alert(err.message, JSON.stringify(err.response.data)));
}
