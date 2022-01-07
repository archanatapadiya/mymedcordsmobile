import React, {useState, useEffect} from 'react';
//  import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from '../header';
import HospitalHeader from '../hospitalHeader';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getHospitalList, getUserId} from '../../utils/api';
import CallHospital from '../callHosp';
import PageLogo from '../pageLogo';

interface HospitalData {
  hospital_id: number;
  name: string;
  logo: string;
}

const Current = ({route}) => {
  const {userData} = route.params;
  const [hospitalList, setHospitalList] = useState<HospitalData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);

  const image = require('./../../assets/logo/background.jpeg');

  console.log('userData--->', userData);

  let hospitalListData: any = [];

  const userHospitalData = async (userId: any) => {
    const hospData = await getHospitalList(userId);
    console.log('hospData--->', hospData);

    hospitalListData = hospData.data;
    setHospitalList(hospitalListData);
    return hospitalListData;
  };

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    return userId;
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  useEffect(() => {
    if (loggedInUserId != 0) {
      const hospListData = userHospitalData(loggedInUserId);
    }
  }, [loggedInUserId]);

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <SafeAreaView>
        <StatusBar />
        <PageLogo />

        <ScrollView contentInsetAdjustmentBehavior="automatic">
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
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
                CURRENT ADMISSION RECORDS
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 20,
              padding: '2%',
            }}>
            <Image
              source={{uri: userData.Hospital_logo}}
              style={styles.logoStyle}
              resizeMode="contain"
            />
            <Text
              style={{
                margin: 10,
                fontSize: 30,
                fontWeight: 'bold',
                color: '#D3ECF9',
              }}>
              {userData.Hospital_name}
            </Text>
            <CallHospital phonenumber={userData.Hospital_phonenumber} />
          </View>

          {/* <HospitalHeader /> */}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // marginTop: 10,
              // marginBottom: 10,
              // padding: '2%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              title="View Reports"
              onPress={() =>
                navigate(ScreenNames.ReportsScreen, {
                  type: 'current',
                  hospName: userData.Hospital_name,
                  logo: userData.Hospital_logo,
                  phoneNumber: userData.Hospital_phonenumber,
                })
              }
            />
            <Text>{'\n'}</Text>
            <Button
              title="View Updates"
              onPress={() =>
                navigate(ScreenNames.UpdatesScreen, {
                  type: 'current',
                  hospName: userData.Hospital_name,
                  logo: userData.Hospital_logo,
                  phoneNumber: userData.Hospital_phonenumber,
                })
              }
            />
            <Text>{'\n'}</Text>
            <Button
              title="View Billing"
              onPress={() =>
                navigate(ScreenNames.BillingScreen, {
                  type: 'current',
                  hospName: userData.Hospital_name,
                  logo: userData.Hospital_logo,
                  phoneNumber: userData.Hospital_phonenumber,
                })
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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
});

export default Current;
