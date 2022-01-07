import {protectedAxios as protectedAxios} from './helpers';
import {unProtectedAxios as unprotectedAxios} from './helpers';
import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from '../navigator/constants';
import dayjs from 'dayjs';

export const saveUserId = async (id: any) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_USER_ID,
    JSON.stringify(id),
  );
};

export const saveUserName = async (user_name: string) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_USERNAME,
    JSON.stringify(user_name),
  );
};

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_TOKEN,
    JSON.stringify(token),
  );
};

export const getUserId = async () => {
  let userId = await AsyncStorage.getItem(Constants.STORAGE_ITEM_USER_ID, null);
  return userId ? JSON.parse(userId) : null;
};

export const getUserName = async () => {
  let userName = await AsyncStorage.getItem(
    Constants.STORAGE_ITEM_USERNAME,
    null,
  );
  return userName ? JSON.parse(userName) : null;
};

export const getToken = async () => {
  let token = await AsyncStorage.getItem(Constants.STORAGE_ITEM_TOKEN, null);
  return token ? JSON.parse(token) : null;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await unprotectedAxios.post('/user_login/', {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const editProfile = async params => {
  try {
    const response = await unprotectedAxios.post('update_user_profile/', {
      user_id: params.user_id,
      email: params.email,
      firstname: params.first_name,
      lastname: params.last_name,
      address: params.address,
      zip_code: params.zip_code,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const verifyUser = async (username: string, date: Date) => {
  try {
    let dateOfBirth = dayjs(date).format('YYYY-MM-DD');

    const response = await unprotectedAxios.post('/check_user_username/', {
      Username: username,
      dob: dateOfBirth,
    });
    console.log('response in api', response);
    return response;
  } catch (error) {
    console.log('error in  verifyUser api' + error);
  }
};

export const resetPassword = async (
  new_password: string,
  resetUserId: string,
) => {
  try {
    const response = await unprotectedAxios.post('/user_forgot_password/', {
      new_password: new_password,
      user_id: resetUserId,
    });
    return response;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const register = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  phone_number: string,
) => {
  try {
    const response = await unprotectedAxios.post('/user_register/', {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone_number: phone_number,
      address: '',
      zip_code: '413002',
      image: '',
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const logout = async () => {
  try {
    const response = await unprotectedAxios.get('/user_logout/', {});
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getUserReports = async (
  userId: any,
  hospitalId: any,
  type: any,
) => {
  try {
    let params = {
      user_id: userId,
      // hospital_id: hospitalId,
    };
    if (type != 'current') {
      params = {
        user_id: userId,
        hospital_id: hospitalId,
      };
    }
    const response = await protectedAxios.post('/report_fetch/', params);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getUserUpdates = async (userId: any, hospitalId: any) => {
  try {
    const response = await protectedAxios.post('/fetch_user_health_update/', {
      user_id: userId,
      hospital_id: hospitalId,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getUserBills = async (userId: any, hospitalId: any) => {
  try {
    const response = await protectedAxios.post('/bill_fetch/', {
      user_id: userId,
      hospital_id: hospitalId,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getHospitalList = async (userId: any) => {
  try {
    const response = await protectedAxios.post('/get_user_hospital_list/', {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const fetchUserDetails = async (userId: any) => {
  try {
    console.log('user id in params in fetch user', userId);
    const response = await protectedAxios.post('/get_user_details/', {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.log('error in api in fetch user' + error);
  }
};
