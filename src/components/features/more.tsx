/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

import {ScreenNames} from '../../navigator/constants';
import PageLogo from '../pageLogo';
import {useNavigation} from '@react-navigation/native';
import {getUserName, getUserId, fetchUserDetails, getUserType} from '../../utils/api';
import {logout, saveUserId} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native-paper';

const More = ({route}) => {
  const image = require('./../../assets/logo/background.jpeg');
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [loggedInUserId, setLoggedInUserId] = useState({});
  const [loggedInUserType, setLoggedInUserType] = useState({});

  const onLogout = async () => {
    const res = await logout();
    if (res?.is_success) {
      const saveUser = await saveUserId(0);
      navigation.navigate(ScreenNames.LoginScreen);
    }
  };

  const getUserDetails = async () => {
    const userId = await getUserId();
   setLoggedInUserId(userId);
   const userType = await getUserType();
    setLoggedInUserType(userType);
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
    <ImageBackground
    source={image}
    style={{flex: 1, width: null, height: null}}>
      <PageLogo />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{

            marginTop: 10,
            paddingLeft: '2%',

          }}>


          <Text style={{margin: 10, fontSize: 20, color: '#D3ECF9'}}>
            {loggedInUserType != 'Health Center' && (
          <Text>
          <MaterialCommunityIcons
         name="arrow-right-circle"
        color={Colors.white}
        size={30}
      />
            <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate(ScreenNames.AccountScreen, {userData: userData})}>{' '} PROFILE </Text>{' '}   {'\n\n'}

            <MaterialCommunityIcons
        name="arrow-right-circle"
        color={Colors.white}
        size={30}
      />

            <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate(ScreenNames.ListAppointmentScreen)}>{' '} REMINDERS </Text>{' '}  {'\n\n'}

            <MaterialCommunityIcons
        name="arrow-right-circle"
        color={Colors.white}
        size={30}
      />
            <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate(ScreenNames.ViewHealthTips)}>{' '} HEALTH TIPS AND INFORMATION</Text>{' '}  {'\n\n'}
            <MaterialCommunityIcons
        name="arrow-right-circle"
        color={Colors.white}
        size={30}
      />
            <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate(ScreenNames.ViewOffersScreen)}>{' '} OFFERS </Text>{' '}  {'\n\n'}
            </Text>
           )}
            <MaterialCommunityIcons
        name="arrow-right-circle"
        color={Colors.white}
        size={30}
      />
            <Text style={{fontWeight: 'bold'}}  onPress={() => onLogout()}>{' '} LOGOUT </Text>{' '}

          </Text>
        </View>

      </ScrollView>
    <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          // position: 'absolute',
          bottom: 0,
        }}>
        <Text style={{color: '#D3ECF9'}}>v2.0</Text>
        <Text style={{color: '#D3ECF9'}}>MEDCLINIQ</Text>
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonView: {
    // padding: 10,
    width: 150,
    alignSelf: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,

    borderRadius: 10,
    width: 60,
    height: 60,
  },
});

export default More;
