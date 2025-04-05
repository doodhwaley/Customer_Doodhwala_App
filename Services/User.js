import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Platform} from 'react-native';
import mime from 'mime';

//Here is the base API
import axios from './API';
import {encode as btoa} from 'base-64';

export async function checkUser() {
  try {
    const value = await AsyncStorage.getItem('token');
    const customer = await AsyncStorage.getItem('customer');
    return [value, customer ? JSON.parse(customer).user : null];
  } catch (e) {}
}

const getImageObject = (image, platform) => {
  if (!image) return null;

  if (platform === 'ios') {
    return {
      uri: image?.assets?.[0]?.uri,
      type: mime.getType(image?.assets?.[0]?.uri),
      name: image?.assets?.[0]?.fileName,
    };
  }
  return {
    uri: image?.assets?.[0]?.uri,
    type: mime.getType(image?.assets?.[0]?.uri),
    name: image?.assets?.[0]?.fileName,
  };
};

export async function registerUser(data) {
  console.log('RIZWAN data', getImageObject(data?.image, Platform));
  // const credentials = btoa(`${data?.username}:${data?.password}`);
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('password', data.password);
  formData.append('subarea', data.subarea ?? '');
  if (data.image) {
    formData.append('image', getImageObject(data?.image, Platform));
  }
  formData.append('is_customer', true);
  // console.log("RIZWAN :formData: ", formData);
  return axios
    .post('/auth/register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      Alert.alert(e.message, JSON.stringify(e.response.data));
    });
}

export async function signUser(username, password) {
  const credentials = btoa(`${username}:${password}`);
  return axios
    .post(
      '/api/auth/login/',
      {
        username: username,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${credentials}`,
        },
      },
    )
    .then(async res => {
      // Store both tokens if they exist in the response
      if (res.data.access_token) {
        await AsyncStorage.setItem('token', res.data.access_token);
      }
      if (res.data.refresh_token) {
        await AsyncStorage.setItem('refreshToken', res.data.refresh_token);
      }

      if (res.data.is_customer) return res.data;
      else
        throw {
          message: 'Error Occured',
          response: {
            data: {
              detail: 'You need to be a Customer to Login To App',
            },
          },
        };
    })
    .catch(e => {
      throw e;
    });
}

export async function signOut(guest) {
  try {
    // Get tokens before clearing storage
    const token = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    // Clear all storage data first
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('customer');
    await AsyncStorage.removeItem('guest');
    await AsyncStorage.removeItem('Cart');
    await AsyncStorage.clear();

    // Only call logout API if not a guest and we have both tokens
    if (!guest && token && refreshToken) {
      return axios
        .post(
          '/auth/logout/',
          {refresh_token: refreshToken},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          return res.data;
        })
        .catch(e => {
          console.warn('Logout API error:', e.message);
          // Don't show alert as we're already logging out
          return {success: true};
        });
    }

    // Return success even if we didn't call the API
    return {success: true};
  } catch (error) {
    console.error('Error in signOut function:', error);
    // Return success anyway - we've cleared the local data
    return {success: true};
  }
}

export async function updateUser(field, value) {
  const customer = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  let userData = customer.user;
  return axios
    .patch(
      `/user/${userData.id}/`,
      {
        push_token: value,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then(res => {})
    .catch(err => console.log(err.response.data));
}

export async function updateProfileImage(image) {
  const customer = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  const newImageUri = 'file:///' + image.uri.split('file:/').join('');
  let formData = new FormData();
  formData.append('image', {
    uri: newImageUri,
    type: mime.getType(newImageUri),
    name: newImageUri.split('/').pop(),
  });
  let userData = customer.user;
  return axios
    .patch(`/user/${userData.id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      Alert.alert('Error Occured', err.response.data.detail);
    });
}

export async function updateUserCode(value) {
  const customerData = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  return axios
    .patch(
      `/customer/${customerData.id}/`,
      {
        verify_code: value,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      if (e.response) {
        return e.response;
      } else {
        alert(e.message);
      }
    });
}

export async function sendCode() {
  const token = await AsyncStorage.getItem('token');
  return axios
    .get(`/sendcode/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(e => {
      if (e.response) {
        return e.response;
      } else {
        alert(e.message);
      }
    });
}

export async function sendEmailCode(email) {
  return axios
    .post(
      `/reset/`,
      {
        email: email,
      },
      {},
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      if (e.response) {
        return e.response;
      } else {
        alert(e.message);
      }
    });
}

export async function checkCode(email, code) {
  return axios
    .post(
      `/checkcode/`,
      {
        email: email,
        code: code,
      },
      {},
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      if (e.response) {
        return e.response;
      } else {
        alert(e.message);
      }
    });
}

export async function changePassword(email, code, password) {
  return axios
    .post(
      `/changepass/`,
      {
        email: email,
        code: code,
        password: password,
      },
      {},
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      if (e.response) {
        return e.response;
      } else {
        alert(e.message);
      }
    });
}

export async function getCities() {
  const token = await AsyncStorage.getItem('token');
  return axios
    .get('/city/')
    .then(response => {
      return response.data;
    })
    .catch(e => {
      Alert.alert(e.message, JSON.stringify(e.response));
    });
}

export async function getUserData() {
  const token = await AsyncStorage.getItem('token');
  let customer = JSON.parse(await AsyncStorage.getItem('customer'));
  return axios
    .get('/customer/' + customer.id + '/', {
      headers: {
        Authorization: 'Token ' + token,
      },
    })
    .then(async response => {
      await AsyncStorage.setItem('customer', JSON.stringify(response.data));
      return response.data;
    })
    .catch(e => {
      if (e.response.status == 401) throw e;
      else Alert.alert(e.message, e.response.data.detail);
    });
}

export async function getAreas(id) {
  const token = await AsyncStorage.getItem('token');
  return axios
    .get('/area/?city_id=' + id)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      Alert.alert(e.message, JSON.stringify(e.response));
    });
}

export async function getSubAreas(id) {
  const token = await AsyncStorage.getItem('token');
  return axios
    .get('/subareas/?area_id=' + id)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      Alert.alert(e.message, JSON.stringify(e.response));
    });
}

export async function updateLocation(value) {
  const customer = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  let userData = customer.user;
  axios
    .patch(
      `/user/${userData.id}/`,
      {
        address: value.address,
        latitude: value.latitude,
        longitude: value.longitude,
      },

      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then(res => {})
    .catch(err => Alert.alert(err.message, JSON.stringify(err.response.data)));
}

export async function updateSubArea(value) {
  const customer = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  let customerData = customer;
  axios
    .patch(
      `/customer/${customerData.id}/`,
      {
        subarea: value,
      },

      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then(res => {})
    .catch(err => Alert.alert(err.message, JSON.stringify(err.response.data)));
}

export async function updatePassword(values) {
  const customer = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  let userData = customer.user;
  return axios
    .patch(
      `/changePassword/`,
      {
        old_password: values.oldpassword,
        new_password: values.password,
        user: userData.id,
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

export async function registerComplain(values) {
  let customer = JSON.parse(await AsyncStorage.getItem('customer'));
  const token = await AsyncStorage.getItem('token');
  return axios
    .post(
      `/complain/`,
      {
        customer: customer.id,
        title: values.title,
        query: values.Message,
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
