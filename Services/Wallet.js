import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import mime from 'mime';

//Here is the base API
import axios from './API';

export async function requestAddition(data, userId) {
  let token = await AsyncStorage.getItem('token');
  let formData = new FormData();
  const newImageUri = 'file:///' + data.image.uri.split('file:/').join('');
  formData.append('customer_id', userId);
  formData.append('transaction_id', data.transaction_id);
  formData.append('amount', data.amount);
  formData.append('type_of', 'MANUAL');
  formData.append('status', 'pending');
  formData.append('image', {
    uri: newImageUri,
    type: mime.getType(newImageUri),
    name: newImageUri.split('/').pop(),
  });
  return axios
    .post('/payment/', formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      Alert.alert(e.message, JSON.stringify(e.response.data));
    });
}

export async function getRechargeHistory(userId) {
  let token = await AsyncStorage.getItem('token');
  return axios
    .get('/recharge-history/' + userId + '/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      Alert.alert(e.message, JSON.stringify(e.response.status));
    });
}
