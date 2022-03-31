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
import { Button, Snackbar } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';
import {navigate} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {getUserName, getUserId, fetchUserDetails} from '../../utils/api';
import PageLogo from '../pageLogo';
import UploadImage from './uploadImageDisplay';
interface BillingData {
  amount: string;
  bill_file_name: string;
  file_url: string;
  billing_time: string;
}

const Billing = ({route}) => {
  const {userData} = route.params;
  const isFocused = useIsFocused();
  const [userData1, setUserData1] = useState({});
  const [bmi, setBmi] = useState(0);

  const [loggedInUserId, setLoggedInUserId] = useState({});
  const image = require('./../../assets/logo/background.jpeg');

  console.log('userData1123', userData1, userData);
  const fetchUserData = async (loggedInUserId: any) => {
    const userReports = await fetchUserDetails(loggedInUserId);
    let userloggedData = userReports?.data;

    let squHeight = Math.pow(userloggedData?.height, 2);
    let squWeight = userloggedData?.weight * 10000;

    let bmiCalc = ((squWeight / squHeight).toFixed(2));
    console.log('squHeight', bmiCalc);

    console.log('userloggedDatauserloggedData', userloggedData);
    setBmi(bmiCalc);
    setUserData1(userloggedData);
    return userloggedData;
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

  useEffect(() => {
    const userDetails = fetchUserData(userData?.user_id);
  }, [isFocused]);

  return (
    <ImageBackground
    source={image}
    style={{flex: 1, width: null, height: null}}>
      <PageLogo />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            // marginBottom: 10,
            paddingLeft: '2%',

          }}>

          <Text style={{margin: 10, fontSize: 20, color: '#D3ECF9'}}>
          <UploadImage userData1={userData1} /> {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>First Name: </Text>{' '}
            {userData1?.first_name}

            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Last Name: </Text>{' '}
            {userData1?.last_name}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Email: </Text>
            {userData1?.email}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Address:</Text>{' '}
            {userData1?.address}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Pincode:</Text>{' '}
            {userData1?.zip_code}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Phone No:</Text>{' '}
            {userData1?.phone_number}
            {'\n\n'}
            <Text style={{fontWeight: 'bold', textDecorationLine:'underline'}}>Health Details</Text>{' '}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Health ID:</Text>{' '}
            {userData1?.health_id}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Blood Group:</Text>{' '}
            {userData1?.blood_group}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Last Blood Pressure:</Text>{' '}
            {userData1?.blood_pressure}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Height:</Text>{' '}
            {userData1?.height ? userData1?.height : '-' } cm
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Weight:</Text>{' '}
            {userData1?.weight ? userData1?.weight : '-'} kg
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>BMI:</Text>{' '}
            {bmi}
            {'\n\n'}
            <Text style={{fontWeight: 'bold'}}>Pulse:</Text>{' '}
            {userData1?.pulse} {'\n\n'}
             {userData1?.is_admit && (
              <Text style={{fontSize: 20}}>
                <Text style={{fontWeight: 'bold'}}>Room No:</Text>{' '}
                {userData1?.room_number}
                {'\n\n'}
              </Text>
             )}
          </Text>

        </View>


        <View style={styles.buttonView}>


              <Button
                  onPress={() =>
                    navigate(ScreenNames.EditProfile, {userData: userData1})
                  }
                  mode="contained"
                  labelStyle={{color: 'white', fontWeight: 'bold'}}
                  style={{backgroundColor:'#85CFF5'}}
                >
                 Edit Profile
                </Button>

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

export default Billing;
