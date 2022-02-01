import React, {useState, useEffect} from 'react';
//  import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Card} from 'react-native-elements';
import {navigate} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {getUserBills, getUserId} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';
import {DataTable} from 'react-native-paper';
import PageLogo from '../pageLogo';

interface BillingData {
  amount: string;
  bill_file_name: string;
  file_url: string;
  billing_time: string;
}

const Billing = ({route}) => {
  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;
  const image = require('./../../assets/logo/background.jpeg');

  let typeUpper = 'CURRENT';
  if (type == 'history') {
    typeUpper = 'HISTORY';
  }
  if (type == 'opd') {
    typeUpper = 'CLINIC BILLS (OPD)';
  }

  const [userBillingList, setUserBillingList] = useState<BillingData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);

  console.log('userBillingList----->', userBillingList);
  let billingData: any = [];

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    return userId;
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  useEffect(() => {
    const userBillingData = async (userId: any) => {
      const userReports = await getUserBills(userId, hospitalId);

      if (type == 'current') {
        billingData = userReports.data.current;
      } else if (type == 'opd') {
        billingData = userReports.data.opd;
      } else {
        billingData = userReports.data.history;
      }

      setUserBillingList(billingData);
      return billingData;
    };

    if (loggedInUserId != 0) {
      const userBilling = userBillingData(loggedInUserId);
    }
  }, [loggedInUserId]);

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />

      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() =>
            type == 'current'
              ? navigate(ScreenNames.Current)
              : type == 'history'
              ? navigate(ScreenNames.HospitalSelection)
              : navigate(ScreenNames.HospitalSelectionOpd)
          }
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
            {typeUpper}
          </Text>
        </View>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          /> */}

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
            source={{uri: logo}}
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
            {hospName}
          </Text>

          <CallHospital phonenumber={phoneNumber} />
        </View>

        {/* <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          /> */}

        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            BILLS
          </Text>
        </View>

        <View />

        {userBillingList?.length != 0 && userBillingList !== undefined ? (
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <DataTable style={{borderWidth: 2, borderColor: '#0A4A6B'}}>
              <DataTable.Header
                style={{
                  borderBottomWidth: 2,
                  backgroundColor: '#C7E7F8',
                }}>
                <DataTable.Title>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#228EC7',
                    }}>
                    Date
                  </Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#228EC7',
                    }}>
                    Bill{' '}
                  </Text>
                </DataTable.Title>
              </DataTable.Header>

              {userBillingList?.map((u, i) => {
                return (
                  <View key={i}>
                    <DataTable.Row
                      style={{
                        backgroundColor: '#67C2F1',
                      }}>
                      <DataTable.Cell>{u.billing_time}</DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={{color: 'blue'}}
                          onPress={() => Linking.openURL(u.file_url)}>
                          {u.bill_file_name}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </View>
                );
              })}
            </DataTable>
          </View>
        ) : (
          <Text
            style={{
              color: '#D3ECF9',
              fontSize: 18,
              marginTop: 20,
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            No Bills Uploaded
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

export default Billing;
