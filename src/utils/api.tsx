import {protectedAxios as protectedAxios} from './helpers';
import {unProtectedAxios as unprotectedAxios} from './helpers';
import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from '../navigator/constants';
import dayjs from 'dayjs';
import axios from 'axios';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../navigator/constants';

export const saveUserId = async (id: any) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_USER_ID,
    JSON.stringify(id),
  );
};

export const saveUserType = async (user_type: string) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_USER_TYPE,
    JSON.stringify(user_type),
  );
};

export const saveUserName = async (user_name: string) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_USERNAME,
    JSON.stringify(user_name),
  );
};

export const saveUserFcm = async (fcmToken: string) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_USERFCM,
    JSON.stringify(fcmToken),
  );
};

export const saveSearchedUserId = async (id: any) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_SEARCHED_USER_ID,
    JSON.stringify(id),
  );
};

export const saveHospitalType = async (hosp_type: string) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_ITEM_HOSPITAL_TYPE,
    JSON.stringify(hosp_type),
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

export const getSearchedUserId = async () => {
  let userId = await AsyncStorage.getItem(
    Constants.STORAGE_ITEM_SEARCHED_USER_ID,
    null,
  );
  return userId ? JSON.parse(userId) : null;
};

export const getHospitalType = async () => {
  let hospType = await AsyncStorage.getItem(
    Constants.STORAGE_ITEM_HOSPITAL_TYPE,
    null,
  );
  return hospType ? JSON.parse(hospType) : null;
};

export const getUserName = async () => {
  let userName = await AsyncStorage.getItem(
    Constants.STORAGE_ITEM_USERNAME,
    null,
  );
  return userName ? JSON.parse(userName) : null;
};

export const getUserFcm = async () => {
  let userFcm = await AsyncStorage.getItem(
    Constants.STORAGE_ITEM_USERFCM,
    null,
  );
  return userFcm ? JSON.parse(userFcm) : null;
};

export const getUserType = async () => {
  let userType = await AsyncStorage.getItem(
    Constants.STORAGE_ITEM_USER_TYPE,
    null,
  );
  return userType ? JSON.parse(userType) : null;
};

export const getToken = async () => {
  let token = await AsyncStorage.getItem(Constants.STORAGE_ITEM_TOKEN, null);
  return token ? JSON.parse(token) : null;
};

export const login = async (email: string, password: string, fcm: string) => {
  try {
    console.log('email, pass, fcm', email, password, fcm);
    const response = await unprotectedAxios.post('/user_login/', {
      username: email,
      password: password,
      fcm_token: fcm,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const hosplogin = async (email: string, password: string) => {
  try {
    const response = await unprotectedAxios.post('/hospital_login/', {
      username: email.toLowerCase(),
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const editProfile = async params => {
  try {
    console.log('values in api edit profile', params);

    const response = await unprotectedAxios.post('update_user_profile/', {
      user_id: params.user_id,
      email: params.email,
      firstname: params.first_name,
      lastname: params.last_name,
      address: params.address,
      zip_code: params.zip_code,
      blood_group: params.blood_group,
      blood_pressure: params.blood_pressure,
      // bmi: params.bmi,
      height: params.height,
      weight: params.weight,
      pulse: params.pulse,
      health_id: params.health_id,
    });
    console.log('response in api', response);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const registerUser = async params => {
  try {
    console.log('values in api register profile', params);
    // let dateOfBirth = dayjs(params.dob).format('YYYY-MM-DD');

    const response = await unprotectedAxios.post('user_register/', {
      // "username": params.username,

      email: params.email,
      firstname: params.first_name,
      lastname: params.last_name,
      password: params.password,
      address: params.address,
      phone_number: params.phone_number,
      zip_code: params.zip_code,
      dob: params.dateOfBirth,
      // dob: '2000-06-11',
      blood_group: params.blood_group,
      blood_pressure: params.blood_pressure,
      // bmi: params.bmi,
      height: params.height,
      weight: params.weight,
      pulse: params.pulse,
      health_id: params.health_id,
    });
    console.log('response in api', response);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const uploadImage = async (params: any) => {
  var photo = {
    uri: params?.image1?.path,
    type: params?.image1?.mime,
    name: 'photo1.jpg',
  };

  let token = await AsyncStorage.getItem(Constants.STORAGE_ITEM_TOKEN, null);

  var form = new FormData();
  form.append('image', photo);
  form.append('user_id', params.user_id);
  form.append('firstname', params?.userData?.first_name);
  form.append('lastname', params?.userData?.last_name);
  form.append('email', params?.userData?.email);
  form.append('address', params?.userData?.address);
  form.append('zip_code', params?.userData?.zip_code);
  form.append('blood_group', params?.userData?.blood_group);
  form.append('blood_pressure', params?.userData?.blood_pressure);
  form.append('bmi', params?.userData?.bmi);
  form.append('pulse', params?.userData?.pulse);
  form.append('health_id', params?.userData?.health_id);

  console.log('image in form', params, form);
  const res = fetch('http://3.109.71.28/update_user_profile/', {
    body: form,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: JSON.parse(token),
    },
  });

  return res;
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

export const verifyHospital = async (username: string, reg_no: string) => {
  try {
    const response = await unprotectedAxios.post('/check_hospital_username/', {
      Username: username.toLowerCase(),
      reg_no: reg_no,
    });
    console.log('response in hospi verify api', response);
    return response;
  } catch (error) {
    console.log('error in  verifyUser api' + error);
  }
};

export const checkSpace = async (user_id: any) => {
  try {
    const response = await protectedAxios.post('/check_space/', {
      user_id: user_id,
    });
    console.log('response in cehck_space', response);
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

export const getUserDetails = async (userId: any, hospitalId: any) => {
  try {
    let params = {
      user_id: userId,
      hospital_id: hospitalId,
    };
    const response = await protectedAxios.post('/get_user_details/', params);
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
      hospital_id: hospitalId,
    };
    if (type == 'current') {
      params = {
        user_id: userId,
      };
    }
    const response = await protectedAxios.post('/report_fetch/', params);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const deleteUserReports = async (id: any) => {
  try {
    let params = {
      id: id,
      delete: true,
    };

    const response = await protectedAxios.post('/delete_report/', params);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getUserHealthdetails = async (
  userId: any,
  hospitalId: any,
  type: any,
) => {
  try {
    let params = {
      user_id: userId,
      hospital_id: hospitalId,
    };
    if (type == 'current') {
      params = {
        user_id: userId,
        // hospital_id: hospitalId,
      };
    }
    const response = await protectedAxios.post(
      '/fetch_user_health_update/',
      params,
    );
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const deleteUserHealthDetails = async (id: any) => {
  try {
    let params = {
      id: id,
      delete: true,
    };

    const response = await protectedAxios.post(
      '/delete_health_update/',
      params,
    );
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getUserBilling = async (
  userId: any,
  hospitalId: any,
  type: any,
) => {
  try {
    let params = {
      user_id: userId,
      hospital_id: hospitalId,
    };
    if (type == 'current') {
      params = {
        user_id: userId,
        // hospital_id: hospitalId,
      };
    }
    const response = await protectedAxios.post('/bill_fetch/', params);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const deleteUserBilling = async (id: any) => {
  try {
    let params = {
      id: id,
      delete: true,
    };

    const response = await protectedAxios.post('/delete_bill/', params);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getUserDocuments = async (userId: any) => {
  try {
    let params = {
      user_id: userId,
    };

    const response = await protectedAxios.post('/user_documents/', params);
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getOffers = async () => {
  try {
    const response = await protectedAxios.post('/view_offers/');
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const getHealthTips = async () => {
  try {
    const response = await protectedAxios.post('/view_health_tip/');
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
};

export const admitPatient = async (
  id: any,
  hospitalId: any,
  isAdmit: any,
  roomNumber: any,
) => {
  try {
    let params = {
      user_id: id,
      hospital_id: hospitalId,
      is_admit: isAdmit,
      room_number: roomNumber,
    };

    const response = await protectedAxios.post('/admit_user/', params);
    return response.data;
  } catch (error) {
    console.log('error in admit api' + error);
  }
};

export const addUserReports = async (
  values: any,
  input2: any,
  loggedInUserId: any,
  fileValue: any,
  searchedUserId: any,
  loggedInHospType: any,
  is_user_upload: any,
  singleFile: any,
) => {
  var photo = {
    uri: singleFile?.uri ? singleFile?.uri : singleFile?.path,
    type: singleFile?.type ? singleFile?.type : singleFile?.mime,
    name: singleFile?.name ? singleFile?.name : 'photo1.jpg',
  };

  console.log('in add ueer reprot api', singleFile);

  let token = await AsyncStorage.getItem(Constants.STORAGE_ITEM_TOKEN, null);

  const reportDate = moment(input2.date).format('yyyy-MM-DD');

  let isOpdType3 = true;
  if (fileValue == 'ipd') {
    isOpdType3 = false;
  }
  let opdFlag = null;
  if (loggedInHospType == 0) {
    opdFlag = null;
  }
  if (loggedInHospType == 1) {
    opdFlag = true;
  }
  if (loggedInHospType == 2) {
    opdFlag = false;
  }
  if (loggedInHospType == 3) {
    opdFlag = isOpdType3;
  }
  var form_data = new FormData();

  form_data.append('file', photo);
  form_data.append('file_name', values.file_name);
  form_data.append('description', values.description);
  form_data.append('health_center', values.health_center);
  form_data.append('user_id', searchedUserId);
  form_data.append('hospital_id', loggedInUserId);
  form_data.append('is_opd', opdFlag);
  form_data.append('dr_name', values.doctor);
  form_data.append('testdate', reportDate);
  form_data.append('is_user_upload', is_user_upload);

  console.log('form_data in my doc upload', form_data);
  const res = await fetch('http://3.109.71.28/report_upload/', {
    body: form_data,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: JSON.parse(token),
    },
  });

  console.log('res upload report', res);
  return res;
};

export const addUserUpdates = async (
  values: any,
  input2: any,
  loggedInUserId: any,
  fileValue: any,
  searchedUserId: any,
  loggedInHospType: any,
) => {
  let token = await AsyncStorage.getItem(Constants.STORAGE_ITEM_TOKEN, null);

  const reportDate = moment(input2.date).format('yyyy-MM-DDTHH:ss');

  let isOpdType3 = true;
  if (fileValue == 'ipd') {
    isOpdType3 = false;
  }
  let opdFlag = null;
  if (loggedInHospType == 1) {
    opdFlag = true;
  }
  if (loggedInHospType == 2) {
    opdFlag = false;
  }
  if (loggedInHospType == 3) {
    opdFlag = isOpdType3;
  }

  var form_data = new FormData();

  form_data.append('health_update', values.health_update);
  form_data.append('datetime', reportDate);
  form_data.append('user_id', searchedUserId);
  form_data.append('hospital_id', loggedInUserId);
  form_data.append('dr_name', values.doctor);
  form_data.append('is_opd', opdFlag);

  const res = await fetch('http://3.109.71.28/user_health_update/', {
    body: form_data,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: JSON.parse(token),
    },
  });

  console.log('res upload report', res);
  return res;
};

export const addUserBills = async (
  values: any,
  input2: any,
  loggedInUserId: any,
  fileValue: any,
  searchedUserId: any,
  loggedInHospType: any,
  singleFile: any,
) => {
  var photo = {
    uri: singleFile?.uri ? singleFile?.uri : singleFile?.path,
    type: singleFile?.type ? singleFile?.type : singleFile?.mime,
    name: singleFile?.name ? singleFile?.name : 'photo1.jpg',
  };

  console.log('photophoto', photo, singleFile);
  let token = await AsyncStorage.getItem(Constants.STORAGE_ITEM_TOKEN, null);

  const reportDate = moment(input2.date).format('yyyy-MM-DD');

  let isOpdType3 = true;
  if (fileValue == 'ipd') {
    isOpdType3 = false;
  }
  let opdFlag = null;
  if (loggedInHospType == 1) {
    opdFlag = true;
  }
  if (loggedInHospType == 2) {
    opdFlag = false;
  }
  if (loggedInHospType == 3) {
    opdFlag = isOpdType3;
  }

  var form_data = new FormData();

  form_data.append('file', photo);
  form_data.append('bill_file_name', values.bill_file_name);
  form_data.append('remark', values.remark);
  form_data.append('user_id', searchedUserId);
  form_data.append('hospital_id', loggedInUserId);
  form_data.append('is_opd', opdFlag);

  const res = await fetch('http://3.109.71.28/bill_upload/', {
    body: form_data,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: JSON.parse(token),
    },
  });

  console.log('res upload bill', res);
  return res;
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

export const searchPatient = async (username: any) => {
  try {
    const response = await protectedAxios.post('/find_request/', {
      username: username,
    });
    return response.data;
  } catch (error) {
    console.log('error in api in fetch user' + error);
  }
};
