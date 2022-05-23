import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';
import {Button, Snackbar} from 'react-native-paper';
import Header from '../header';
import Carousel from '../carousel';
import {navigate, push} from '../../navigator/NavigationService';
import {API, ScreenNames} from '../../navigator/constants';
import {
  getUserName,
  getUserId,
  getUserType,
  fetchUserDetails,
  searchPatient,
  saveSearchedUserId,
} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLogo from '../pageLogo';
import Styles from './login/styles';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [userData, setUserData] = useState({});
  const [loggedInUserId, setLoggedInUserId] = useState({});
  const [loggedInUserType, setLoggedInUserType] = useState({});

  const [searchedUser, setSearchedUser] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Logo = require('./../../assets/logo/MyMedCordsTransparent.png');
  const image = require('./../../assets/logo/background.jpeg');

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    const userName = await getUserName();
    const userType = await getUserType();
    setLoggedInUserType(userType);
    return userName;
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
  };

  useEffect(() => {
    const userName = getUserDetails();

    checkToken();
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

  const onSearchPatient = async (username: string) => {
    let success = await searchPatient(username);

    console.log('success---------->', success);
    if (success.data.user_id) {
      navigate(ScreenNames.PatientDetailsScreen, {
        userData: userData,
      });
    }

    if (success) {
      setSearchedUser(success.data.username);
      const saveSearchedUser = await saveSearchedUserId(success.data.user_id);
    }
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
        {loggedInUserType == 'Patient' && (
          <View
            style={{
              marginTop: '10%',
            }}>
            <View style={{marginTop: '5%'}}>
              <Text style={styles.sectionHeading}>CLINIC RECORDS (OPD)</Text>
            </View>

            <View style={styles.buttonView}>
              <MaterialCommunityIcons
                onPress={() =>
                  navigate(ScreenNames.HospitalSelectionOpd, {
                    userData: userData,
                  })
                }
                name="arrow-right-circle"
                color="#D3ECF9"
                size={40}
                style={{marginLeft: '8%'}}
              />
              <Text
                onPress={() =>
                  navigate(ScreenNames.HospitalSelectionOpd, {
                    userData: userData,
                  })
                }
                style={{
                  marginTop: '2%',
                  marginLeft: '5%',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#D3ECF9',
                }}>
                View
              </Text>
            </View>

            <View style={{marginTop: '5%'}}>
              <Text style={styles.sectionHeading}>HOSPITAL RECORDS (IPD)</Text>
            </View>

            {userData?.is_admit && (
              <View style={styles.buttonView}>
                <MaterialCommunityIcons
                  onPress={() =>
                    userData?.is_admit
                      ? navigate(ScreenNames.Current, {userData: userData})
                      : console.log('not a current user')
                  }
                  name="arrow-right-circle"
                  color="#D3ECF9"
                  size={40}
                  style={{marginLeft: '8%'}}
                />
                <Text
                  onPress={() =>
                    userData?.is_admit
                      ? navigate(ScreenNames.Current, {userData: userData})
                      : console.log('not a current user')
                  }
                  style={{
                    marginTop: '2%',
                    marginLeft: '5%',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#D3ECF9',
                  }}>
                  Current
                </Text>
              </View>
            )}

            <View style={styles.buttonView}>
              <MaterialCommunityIcons
                onPress={() =>
                  navigate(ScreenNames.HospitalSelection, {userData: userData})
                }
                name="arrow-right-circle"
                color="#D3ECF9"
                size={40}
                style={{marginLeft: '8%'}}
              />
              <Text
                onPress={() =>
                  navigate(ScreenNames.HospitalSelection, {userData: userData})
                }
                style={{
                  marginTop: '2%',
                  marginLeft: '5%',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#D3ECF9',
                }}>
                History
              </Text>
            </View>

            <View style={{marginTop: '5%'}}>
              <Text style={styles.sectionHeading}>MY DOCUMENTS</Text>
            </View>

            <View style={styles.buttonView}>
              <MaterialCommunityIcons
                onPress={() =>
                  navigate(ScreenNames.MyDocumentViewScreen, {
                    userData: userData,
                  })
                }
                name="arrow-right-circle"
                color="#D3ECF9"
                size={40}
                style={{marginLeft: '8%'}}
              />
              <Text
                onPress={() =>
                  navigate(ScreenNames.MyDocumentViewScreen, {
                    userData: userData,
                  })
                }
                style={{
                  marginTop: '2%',
                  marginLeft: '5%',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#D3ECF9',
                }}>
                View
              </Text>
            </View>
          </View>
        )}

        {loggedInUserType == 'Health Center' && (
          <View
            style={{
              marginTop: '10%',
            }}>
            <Formik
              initialValues={{
                username: '',
              }}
              onSubmit={values => {
                onSearchPatient(values.username);
              }}>
              {formikProps => (
                <React.Fragment>
                  <View style={Styles.mainContainer}>
                    <View style={Styles.container}>
                      <View style={Styles.loginContainer}>
                        <View style={styles.buttonView1}>
                          <Button
                            onPress={() => navigate(ScreenNames.AddNewUser)}
                            mode="contained"
                            labelStyle={{color: 'white', fontWeight: 'bold'}}
                            style={{backgroundColor: '#85CFF5'}}>
                            Add New User
                          </Button>
                        </View>

                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginBottom: 15,
                            color: '#D3ECF9',
                          }}>
                          {' '}
                          SEARCH PATIENT
                        </Text>

                        <TextInput
                          defaultValue={formikProps.values.username}
                          placeholder="Enter phone number"
                          style={[Styles.inputLabel1, Styles.textStyle]}
                          // keyboardType="email-address"
                          onChangeText={formikProps.handleChange('username')}
                          onBlur={formikProps.handleBlur('username')}
                        />
                        <Text style={Styles.formErrorMessage}>
                          {formikProps.touched.username &&
                            formikProps.errors.username}
                        </Text>

                        {searchedUser === undefined && (
                          <Text
                            style={{
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: 14,
                              marginBottom: 15,
                              color: '#D3ECF9',
                            }}>
                            No record found, please register
                          </Text>
                        )}
                        <Button
                          color="#fff"
                          onPress={formikProps.handleSubmit}
                          mode="contained"
                          labelStyle={Styles.nextButtonText1}
                          style={Styles.nextButtonContainer1}>
                          {'  '}Submit{'  '}
                        </Button>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              )}
            </Formik>
          </View>
        )}
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
  sectionHeading: {
    color: '#D3ECF9',
    fontSize: 18,
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    fontWeight: 'bold',
    marginLeft: '10%',
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

  logoStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    borderWidth: 1,
    padding: '2%',
    borderRadius: 10,
    width: 90,
    height: 70,
    marginTop: 20,
    marginRight: 20,
  },

  buttonView1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
});

export default App;
