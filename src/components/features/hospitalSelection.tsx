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
import PageLogo from '../pageLogo';

interface HospitalData {
  hospital_id: number;
  name: string;
  logo: string;
}

const Current = ({route}) => {
  // const {userData} = route.params;

  const [hospitalList, setHospitalList] = useState<HospitalData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);

  const [hospitalListOpd, setHospitalListOpd] = useState<HospitalData[]>();
  const [hospitalListIpd, setHospitalListIpd] = useState<HospitalData[]>();

  console.log('hospitalListIpdhospitalListIpd', hospitalListIpd);
  const image = require('./../../assets/logo/background.jpeg');
  let hospitalListData: any = [];

  const userHospitalData = async (userId: any) => {
    const hospData = await getHospitalList(userId);
    console.log(',hospData', hospData);
    hospitalListData = hospData.data;
    // setHospitalList(hospitalListData);
    setHospitalListOpd(hospitalListData.opd);
    setHospitalListIpd(hospitalListData.ipd);

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
            HOSPITAL RECORDS
          </Text>
        </View>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {hospitalListIpd?.filter(name => name.hospital_type != 1).length != 0 &&
        hospitalListIpd?.filter(name => name.hospital_type != 1).length !==
          undefined ? (
          hospitalListIpd
            ?.filter(name => name.hospital_type != 1)
            .map((u, i) => {
              console.log('hospitalList in loop', hospitalList);
              return (
                // u.name != userData?.Hospital_name ? (
                <View style={{marginTop: 10, marginBottom: 10}}>
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
                      source={{uri: u.logo}}
                      style={styles.logoStyle}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#D3ECF9',
                      }}>
                      {u.name}
                    </Text>
                  </View>

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
                    <View>
                      <Button
                        title="VIEW REPORTS"
                        // color="#D3ECF9"
                        onPress={() =>
                          navigate(ScreenNames.ReportsScreen, {
                            type: 'history',
                            hospName: u.name,
                            logo: u.logo,
                            hospitalId: u.pk,
                            phoneNumber: u.phone_number,
                          })
                        }
                      />
                    </View>

                    <Text>{'\n'}</Text>
                    <View>
                      <Button
                        title="VIEW NOTES"
                        // color="#D3ECF9"
                        onPress={() =>
                          navigate(ScreenNames.UpdatesScreen, {
                            type: 'history',
                            hospName: u.name,
                            logo: u.logo,
                            hospitalId: u.pk,
                            phoneNumber: u.phone_number,
                          })
                        }
                      />
                    </View>

                    <Text>{'\n'}</Text>

                    <View>
                      <Button
                        title="VIEW BILLING"
                        // color="#D3ECF9"
                        onPress={() =>
                          navigate(ScreenNames.BillingScreen, {
                            type: 'history',
                            hospName: u.name,
                            logo: u.logo,
                            hospitalId: u.pk,
                            phoneNumber: u.phone_number,
                          })
                        }
                      />
                    </View>
                  </View>
                </View>
              );
            })
        ) : (
          <Text
            style={{
              color: '#D3ECF9',
              fontSize: 18,
              marginTop: 20,
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            No records found. {'\n'}Contact your health care provider for
            details.
          </Text>
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
