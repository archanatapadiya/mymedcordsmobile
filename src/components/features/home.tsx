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
  Button,
  Alert,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from '../header';
import Carousel from '../carousel';
import {navigate, push} from '../../navigator/NavigationService';
import {API, ScreenNames} from '../../navigator/constants';
import {getUserName, getUserId, fetchUserDetails} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLogo from '../pageLogo';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [userData, setUserData] = useState({});

  console.log('userData in home', userData);

  const [loggedInUserId, setLoggedInUserId] = useState({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Logo = require('./../../assets/logo/MyMedCordsTransparent.png');
  const image = require('./../../assets/logo/background.jpeg');

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
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
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

          <View style={{marginTop: '10%'}}>
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
                style={{
                  marginTop: '2%',
                  marginLeft: '5%',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#D3ECF9',
                }}>
                Current
              </Text>

              {/* <Button
                title="CURRENT"
                onPress={() =>
                  navigate(ScreenNames.Current, {userData: userData})
                }
                disabled={!userData?.is_admit}
              /> */}
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

  buttonView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
});

export default App;
