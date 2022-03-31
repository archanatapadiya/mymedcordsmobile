import React, {useState, useEffect} from 'react';
//  import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';
import Header from '../header';
import HospitalHeader from '../hospitalHeader';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-elements';
import {
  getHospitalList,
  getUserId,
  getUserDetails,
  getSearchedUserId,
  admitPatient,
  getHospitalType,
} from '../../utils/api';
import PageLogo from '../pageLogo';
import Styles from './login/styles';

interface HospitalData {
  hospital_id: number;
  name: string;
  logo: string;
}

const Current = ({route}) => {
  // const {userData} = route.params;
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [searchedUserId, setSearchedUserId] = useState(0);
  const [loggedInHospType, setLoggedInHospType] = useState(0);

  console.log('userdata in patient details', userDetails);

  const image = require('./../../assets/logo/background.jpeg');

  let userDetailsData: any = [];

  const getUserDetail1 = async () => {
    const userId = await getUserId();
    const hospType = await getHospitalType();
    const searchedUserId = await getSearchedUserId();

    setLoggedInUserId(userId);
    setLoggedInHospType(hospType);
    setSearchedUserId(searchedUserId);

    return userId;
  };

  useEffect(() => {
    const userId = getUserDetail1();
  }, []);

  useEffect(() => {
    const userDetailsData1 = async (userId: any) => {
      const searchedUserId = await getSearchedUserId();

      const userDetails = await getUserDetails(searchedUserId, userId);

      userDetailsData = userDetails?.data;
      setUserDetails(userDetailsData);
      return userDetails;
    };

    if (loggedInUserId != 0) {
      const userDetail = userDetailsData1(loggedInUserId);
    }
  }, [loggedInUserId]);

  const admitUser = async (
    searchedUserId: any,
    loggedInUserId: any,
    isAdmit: any,
    room_number: any,
  ) => {
    const res = await admitPatient(
      searchedUserId,
      loggedInUserId,
      isAdmit,
      room_number,
    );

    if (res) {
      const userDetailsData1 = async (userId: any) => {
        const searchedUserId = await getSearchedUserId();

        const userDetails = await getUserDetails(searchedUserId, userId);

        userDetailsData = userDetails?.data;
        setUserDetails(userDetailsData);
        return userDetails;
      };

      const userDetail = userDetailsData1(loggedInUserId);
    }
    if (res == undefined) {
      Alert.alert('Patient already admit in other hospital');
    }
  };
  const createTwoButtonAlert = (values: any) => {
    let isAdmit = false;
    if (!userDetails?.is_admit) {
      isAdmit = true;
    }

    let roomNumber;
    if (!userDetails?.is_admit) {
      roomNumber = values.room_number;
    } else {
      roomNumber = userDetails?.room_number;
    }

    let message = 'Admit Patient';
    if (userDetails?.is_admit) {
      message = 'Discharge patient';
    }
    Alert.alert(message, 'Press OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          admitUser(searchedUserId, loggedInUserId, isAdmit, roomNumber),
      },
    ]);
  };

  const handleDischarge = (values: any) => {
    let isAdmit = false;
    if (!userDetails?.is_admit) {
      isAdmit = true;
    }
    Alert.alert('Admit Patient', 'Press OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          admitUser(
            searchedUserId,
            loggedInUserId,
            isAdmit,
            values.room_number,
          ),
      },
    ]);
  };

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />

      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.HomeScreen)}
          name="arrow-left-circle"
          color="#D3ECF9"
          size={30}
          style={{marginTop: 18, marginLeft: 10}}
        />

        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            PATIENT DETAILS
          </Text>
        </View>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            // flex: 1,
            margin: 10,
            padding: 20,
            borderWidth: 2,
            borderColor: 'thistle',
            alignSelf: 'center',
            // borderRadius: 50,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            Name: {userDetails?.first_name + ' ' + userDetails?.last_name}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            Email: {userDetails?.email}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            Address: {userDetails?.address}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            Phone Number: {userDetails?.phone_number}
          </Text>
          {userDetails?.is_admit && (
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              Room Number: {userDetails?.room_number}
            </Text>
          )}
        </View>

        <View
          style={{
            margin: 10,
            alignSelf: 'center',
          }}>
          <Formik
            initialValues={{
              room_number: '',
            }}
            onSubmit={values => createTwoButtonAlert(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                {(loggedInHospType == 2 || loggedInHospType == 3) &&
                  !userDetails?.is_admit && (
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#D3ECF9',
                          marginTop: 10,
                          textAlign: 'center',
                        }}>
                        Enter Room Number
                      </Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('room_number')}
                        onBlur={handleBlur('room_number')}
                        value={values.room_number}
                      />

                      <Button
                        color="#fff"
                        onPress={handleSubmit}
                        mode="contained"
                        labelStyle={Styles.nextButtonText1}
                        style={Styles.nextButtonContainer1}>
                        {!userDetails?.is_admit
                          ? 'Admit Patient'
                          : 'Discharge Patient'}
                      </Button>
                    </View>
                  )}
                {(loggedInHospType == 2 || loggedInHospType == 3) &&
                  userDetails?.is_admit && (
                    <View>
                      <Button
                        color="#fff"
                        onPress={createTwoButtonAlert}
                        mode="contained"
                        labelStyle={Styles.nextButtonText1}
                        style={Styles.nextButtonContainer1}>
                        {'  '}Discharge Patient{'  '}
                      </Button>
                    </View>
                  )}
              </View>
            )}
          </Formik>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              navigate(ScreenNames.ReportsViewScreen, {
                type: 'all',
                userDetails: userDetails,
              })
            }
            name="arrow-right-circle"
            color="#D3ECF9"
            size={30}
            style={{marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}>
            <Text
              onPress={() =>
                navigate(ScreenNames.ReportsViewScreen, {
                  type: 'all',
                  userDetails: userDetails,
                })
              }
              style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              View Reports
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              navigate(ScreenNames.HealthDetailsViewScreen, {
                type: 'all',
                userDetails: userDetails,
              })
            }
            name="arrow-right-circle"
            color="#D3ECF9"
            size={30}
            style={{marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}>
            <Text
              onPress={() =>
                navigate(ScreenNames.HealthDetailsViewScreen, {
                  type: 'all',
                  userDetails: userDetails,
                })
              }
              style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              View Health Updates
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              navigate(ScreenNames.BillingViewScreen, {
                type: 'all',
                userDetails: userDetails,
              })
            }
            name="arrow-right-circle"
            color="#D3ECF9"
            size={30}
            style={{marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}>
            <Text
              onPress={() =>
                navigate(ScreenNames.BillingViewScreen, {
                  type: 'all',
                  userDetails: userDetails,
                })
              }
              style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              View Bills
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              navigate(ScreenNames.ReportsAddScreen, {
                type: 'all',
                userDetails: userDetails,
              })
            }
            name="arrow-right-circle"
            color="#D3ECF9"
            size={30}
            style={{marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}>
            <Text
              onPress={() =>
                navigate(ScreenNames.ReportsAddScreen, {
                  type: 'all',
                  userDetails: userDetails,
                })
              }
              style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              Upload Reports
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              navigate(ScreenNames.HealthdetailsAddScreen, {
                type: 'all',
                userDetails: userDetails,
              })
            }
            name="arrow-right-circle"
            color="#D3ECF9"
            size={30}
            style={{marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}>
            <Text
              onPress={() =>
                navigate(ScreenNames.HealthdetailsAddScreen, {
                  type: 'all',
                  userDetails: userDetails,
                })
              }
              style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              Upload Health Details
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              navigate(ScreenNames.BillingAddScreen, {
                type: 'all',
                userDetails: userDetails,
              })
            }
            name="arrow-right-circle"
            color="#D3ECF9"
            size={30}
            style={{marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}>
            <Text
              onPress={() =>
                navigate(ScreenNames.BillingAddScreen, {
                  type: 'all',
                  userDetails: userDetails,
                })
              }
              style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              Upload Bills
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{flex: 1}} />
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
    padding: 10,
    width: 150,
  },
  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,

    borderRadius: 10,
    width: 60,
    height: 60,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D3ECF9',
    backgroundColor: 'white',
  },
});

export default Current;
