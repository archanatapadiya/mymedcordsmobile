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
import {Card} from 'react-native-elements';
import {getHospitalList, getUserId} from '../../utils/api';

interface HospitalData {
  hospital_id: number;
  name: string;
  logo: string;
}

const Current = ({route}) => {
  const {userData} = route.params;

  const [hospitalList, setHospitalList] = useState<HospitalData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);

  console.log('hospitalList111', userData);
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>HISTORY</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

        <Card>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Please select a hospital
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginTop: 10,
            }}
          />
          <Card.Divider />
          {hospitalList?.map((u, i) => {
            return u.name != userData?.Hospital_name ? (
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
                  source={{uri: u.logo}}
                  style={styles.logoStyle}
                  resizeMode="contain"
                />
                <Text
                  style={{margin: 10, fontSize: 25, fontWeight: 'bold'}}
                  onPress={() =>
                    navigate(ScreenNames.History, {
                      hospName: u.name,
                      logo: u.logo,
                      hospitalId: u.pk,
                      phoneNumber: u.phone_number,
                    })
                  }>
                  {u.name}
                </Text>
              </View>
            ) : (
              console.log('current hospital rejected ')
            );
          })}
        </Card>
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
