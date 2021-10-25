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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [userData, setUserData] = useState({});

  console.log('userData in home', userData);

  const [loggedInUserId, setLoggedInUserId] = useState({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Logo = require('./../../assets/logo/medCordsIcon.jpeg');

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

    // let userloggedData = userReports?.data;

    // if (!userloggedData) {
    //   userReports = await fetchUserDetails(loggedInUserId);
    //   userloggedData = userReports?.data;
    // }
    // if (userloggedData) {
    //   setUserData(userloggedData);
    // }
    return userloggedData;
  };

  useEffect(() => {
    if (loggedInUserId != 0) {
      const userDetails = fetchUserData(loggedInUserId);
    }
  }, [loggedInUserId]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Image source={Logo} style={styles.logoStyle} resizeMode="contain" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            marginTop: '10%',
          }}>
          <View style={styles.buttonView}>
            <Button
              title="CURRENT"
              onPress={() =>
                navigate(ScreenNames.Current, {userData: userData})
              }
              disabled={!userData?.is_admit}
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="HISTORY"
              onPress={() =>
                navigate(ScreenNames.HospitalSelection, {userData: userData})
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="ACCOUNT"
              onPress={() =>
                navigate(ScreenNames.AccountScreen, {userData: userData})
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,
    padding: '2%',
    borderRadius: 10,
    width: 120,
    height: 90,
    marginTop: 20,
  },

  buttonView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
});

export default App;
