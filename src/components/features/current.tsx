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

interface HospitalData {
  hospital_id: number;
  name: string;
  logo: string;
}

const Current = ({route}) => {
  const {userData} = route.params;
  const [hospitalList, setHospitalList] = useState<HospitalData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [currentHospital, setCurrentHospital] = useState({});
  const [currentHospitalPhonenumber, setCurrentHospitalPhonenumber] =
    useState();

  let hospitalListData: any = [];

  const userHospitalData = async (userId: any) => {
    const hospData = await getHospitalList(userId);
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

  useEffect(() => {
    for (let i = 0; i <= hospitalList?.length; i++) {
      if (hospitalList[i]?.name == userData?.Hospital_name) {
        setCurrentHospital(hospitalList[i]);
        setCurrentHospitalPhonenumber(hospitalList[i]?.phone_number);
      }
    }
  }, [hospitalList]);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() => navigate(ScreenNames.HomeScreen)}
            name="keyboard-backspace"
            color={Colors.black}
            size={30}
            style={{marginTop: 18, marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>CURRENT</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            padding: '2%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: currentHospital.logo}}
            style={styles.logoStyle}
            resizeMode="contain"
          />
          <Text style={{margin: 10, fontSize: 30, fontWeight: 'bold'}}>
            {userData.Hospital_name}
          </Text>
          <CallHospital phonenumber={currentHospitalPhonenumber} />
        </View>

        {/* <HospitalHeader /> */}

        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View style={styles.buttonView}>
            <Button
              title="REPORTS"
              onPress={() =>
                navigate(ScreenNames.ReportsScreen, {
                  type: 'current',
                  hospName: userData.Hospital_name,
                  logo: userData.Hospital_logo,
                  phoneNumber: currentHospital.phone_number,
                })
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="UPDATES"
              onPress={() =>
                navigate(ScreenNames.UpdatesScreen, {
                  type: 'current',
                  hospName: userData.Hospital_name,
                  logo: userData.Hospital_logo,
                  phoneNumber: currentHospital.phone_number,
                })
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="BILLING"
              onPress={() =>
                navigate(ScreenNames.BillingScreen, {
                  type: 'current',
                  hospName: userData.Hospital_name,
                  logo: userData.Hospital_logo,
                  phoneNumber: currentHospital.phone_number,
                })
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="INFORMATION"
              onPress={() => navigate(ScreenNames.InfoScreen)}
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
