import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {getUserReports, getUserId} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';
import {DataTable} from 'react-native-paper';
import PageLogo from '../pageLogo';

interface ReportData {
  descreption: string;
  lab_id__name: string;
  file_name: string;
  file_url: string;
  event_time: string;
}

const Reports = ({route}) => {
  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;

  const image = require('./../../assets/logo/background.jpeg');

  let typeUpper = 'CURRENT';
  if (type == 'history') {
    typeUpper = 'HISTORY';
  }
  if (type == 'opd') {
    typeUpper = 'CLINIC REPORTS (OPD)';
  }
  const [userReportList, setUserReportList] = useState<ReportData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  let reportsData: any = [];

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    return userId;
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  useEffect(() => {
    const userReportsData = async (userId: any) => {
      const userReports = await getUserReports(userId, hospitalId, type);
      console.log('userReports--->', userReports);
      if (type == 'current') {
        reportsData = userReports.data.current;
      } else if (type == 'opd') {
        reportsData = userReports.data.opd;
      } else {
        reportsData = userReports.data.history;
      }
      setUserReportList(reportsData);
      return reportsData;
    };

    if (loggedInUserId != 0) {
      const userReports = userReportsData(loggedInUserId);
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

        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            REPORTS
          </Text>
        </View>

        <View />
        {userReportList?.length != 0 && userReportList !== undefined ? (
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <ScrollView horizontal>
              <DataTable
                style={{
                  borderWidth: 2,
                  borderColor: '#0A4A6B',
                }}>
                <DataTable.Header
                  style={{
                    // paddingLeft: 50,
                    // paddingRight: 30,
                    borderBottomWidth: 2,
                    backgroundColor: '#C7E7F8',
                  }}>
                  <DataTable.Title
                    style={{
                      width: 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Date
                    </Text>
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      width: 100,
                      paddingLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Doctor{' '}
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={{
                      width: 100,
                      paddingLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Report Date
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    style={{
                      width: 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Reports{' '}
                    </Text>
                  </DataTable.Title>
                </DataTable.Header>

                {userReportList?.map((u, i) => {
                  return (
                    <View key={i}>
                      <DataTable.Row
                        style={{
                          // paddingLeft: 30,
                          // paddingRight: 30,
                          backgroundColor: '#67C2F1',
                        }}>
                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            width: 150,
                            padding: 20,
                          }}>
                          {u.event_time}
                        </DataTable.Cell>

                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            width: 150,
                            padding: 20,
                          }}>
                          {u.dr_name}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            width: 150,
                            padding: 20,
                          }}>
                          {u.testdate}
                        </DataTable.Cell>

                        <DataTable.Cell
                          numeric
                          style={{
                            // borderRightWidth: 2,
                            // borderColor: '#0A4A6B',
                            width: 150,
                            padding: 20,
                          }}>
                          <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL(u.file_url)}>
                            {u.file_name}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    </View>
                  );
                })}
              </DataTable>
            </ScrollView>
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
            No Reports Uploaded
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
  head: {height: 40, backgroundColor: '#f1f8ff', fontSize: 16},
  text: {textAlign: 'center', textAlignVertical: 'center', fontSize: 14},
});

export default Reports;
