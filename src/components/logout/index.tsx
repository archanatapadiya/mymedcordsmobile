import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native-paper';
import {ScreenNames} from '../../navigator/constants';
import {logout, saveUserId} from '../../utils/api';
import {getUserName, getUserId, fetchUserDetails} from '../../utils/api';

const Logout: React.FC = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [loggedInUserId, setLoggedInUserId] = useState({});

  const onLogout = async () => {
    const res = await logout();
    if (res?.is_success) {
      const saveUser = await saveUserId(0);
      navigation.navigate(ScreenNames.LoginScreen);
    }
  };

  const onMore = async () => {
    navigation.navigate(ScreenNames.MoreScreen);
  };

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    const userName = await getUserName();
    return userName;
  };

  useEffect(() => {
    const userName = getUserDetails();
    return () => console.log('hello world');
  }, []);

  const fetchUserData = async (loggedInUserId: any) => {
    let userReports = await fetchUserDetails(loggedInUserId);
    let userloggedData;
    if (!userReports?.data) {
      userReports = await fetchUserDetails(loggedInUserId);
    } else {
      userloggedData = userReports?.data;
      setUserData(userloggedData);
    }
    return userloggedData;
  };

  useEffect(() => {
    if (loggedInUserId != 0) {
      const userDetails = fetchUserData(loggedInUserId);
    }
  }, [loggedInUserId]);

  return (
    <View style={Styles.container}>
      {/* <MaterialCommunityIcons
        onPress={() =>
          navigation.navigate(ScreenNames.AccountScreen, {userData: userData})
        }
        name="account"
        color={Colors.white}
        size={30}
      />

      <MaterialCommunityIcons
        onPress={() => onLogout()}
        name="logout"
        color={Colors.white}
        size={30}
        style={{marginLeft: 10}}
      /> */}

      <MaterialCommunityIcons
        onPress={() => onMore()}
        name="more"
        color={Colors.white}
        size={30}
        style={{marginLeft: 10}}
      />
    </View>
  );
};

export default Logout;
