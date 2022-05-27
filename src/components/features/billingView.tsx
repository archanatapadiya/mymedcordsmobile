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
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {
  getUserBilling,
  getUserId,
  getSearchedUserId,
  deleteUserBilling,
} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';
import {DataTable, IconButton} from 'react-native-paper';
import PageLogo from '../pageLogo';
import moment from 'moment';

interface ReportData {
  descreption: string;
  lab_id__name: string;
  file_name: string;
  file_url: string;
  event_time: string;
}

const Reports = ({route}) => {
  const {type, userDetails} = route.params;

  const image = require('./../../assets/logo/background.jpeg');

  const [userReportListCurrent, setUserReportListCurrent] =
    useState<ReportData[]>();
  const [userReportListHistory, setUserReportListHistory] =
    useState<ReportData[]>();
  const [userReportListOPD, setUserReportListOPD] = useState<ReportData[]>();

  const [loggedInUserId, setLoggedInUserId] = useState(0);
  let reportsData: any = [];

  const createTwoButtonAlert = (id: any) => {
    Alert.alert('Delete bill', 'Press OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteReports(id)},
    ]);
  };

  const deleteReports = async (id: any) => {
    const res = await deleteUserBilling(id);
    if (res.is_success) {
      const searchedUserId = await getSearchedUserId();

      const userReports = await getUserBilling(
        searchedUserId,
        loggedInUserId,
        type,
      );
      setUserReportListCurrent(userReports?.data?.current);
      setUserReportListHistory(userReports?.data?.history);
      setUserReportListOPD(userReports?.data?.opd);
    }
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
    const userReportsData = async (userId: any) => {
      const searchedUserId = await getSearchedUserId();

      const userReports = await getUserBilling(searchedUserId, userId, type);
      setUserReportListCurrent(userReports?.data?.current);
      setUserReportListHistory(userReports?.data?.history);
      setUserReportListOPD(userReports?.data?.opd);
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
          onPress={() => navigate(ScreenNames.PatientDetailsScreen)}
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
            UPLOADED BILLS FOR THE USER
          </Text>
        </View>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            OPD BILLS
          </Text>
        </View>

        <View />
        {userReportListOPD?.length != 0 && userReportListOPD !== undefined ? (
          <View style={{paddingLeft: 2, paddingRight: 2}}>
            <ScrollView>
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
                      // width: 100,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Type
                    </Text>
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      // width: 100,
                      flex: 1.5,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      {'    '}
                      Remarks
                    </Text>
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      // width: 100,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Upload Date
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={{
                      // width: 20,
                      flex: 0.7,
                    }}
                  />
                </DataTable.Header>

                {userReportListOPD?.map((u, i) => {
                  let testDate1 = moment(u.billing_time).format('DD/MM/YY');

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
                            // width: 150,
                            flex: 1,
                            padding: 3,
                          }}>
                          <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL(u.file_url)}>
                            {u.bill_file_name}
                          </Text>
                        </DataTable.Cell>

                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            // width: 150,
                            flex: 1.5,
                            padding: 3,
                          }}>
                          {u.remark}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            // width: 150,
                            flex: 1,
                            padding: 3,
                          }}>
                          {testDate1}
                        </DataTable.Cell>

                        <DataTable.Cell style={{flex: 0.7}}>
                          <View>
                            <IconButton
                              icon="delete"
                              color={Colors.red500}
                              size={20}
                              onPress={() => createTwoButtonAlert(u.id)}
                            />
                          </View>
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
            No Bills Uploaded
          </Text>
        )}

        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            IPD Bills
          </Text>
        </View>

        {userDetails?.is_admit && (
          <View
            style={{
              flex: 1,
              margin: 20,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
              CURRENT
            </Text>
          </View>
        )}
        {userDetails?.is_admit &&
          (userReportListCurrent?.length != 0 &&
          userReportListCurrent !== undefined ? (
            <View style={{paddingLeft: 2, paddingRight: 2}}>
              <ScrollView>
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
                        flex: 1, // width: 100,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#228EC7',
                        }}>
                        Type
                      </Text>
                    </DataTable.Title>

                    <DataTable.Title
                      style={{
                        // width: 100,
                        flex: 1.5,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#228EC7',
                        }}>
                        {'    '}Remarks
                      </Text>
                    </DataTable.Title>

                    <DataTable.Title
                      style={{
                        // width: 100,
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#228EC7',
                        }}>
                        Upload Date
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={{
                        // width: 20,
                        flex: 0.7,
                      }}
                    />
                  </DataTable.Header>

                  {userReportListCurrent?.map((u, i) => {
                    let testDate1 = moment(u.billing_time).format('DD/MM/YY');

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
                              // width: 150,
                              flex: 1,
                              padding: 3,
                            }}>
                            <Text
                              style={{color: 'blue'}}
                              onPress={() => Linking.openURL(u.file_url)}>
                              {u.bill_file_name}
                            </Text>
                          </DataTable.Cell>

                          <DataTable.Cell
                            style={{
                              borderRightWidth: 2,
                              borderColor: '#0A4A6B',
                              // width: 150,
                              flex: 1.5,
                              padding: 3,
                            }}>
                            {u.remark}
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              borderRightWidth: 2,
                              borderColor: '#0A4A6B',
                              // width: 150,
                              flex: 1,
                              padding: 3,
                            }}>
                            {testDate1}
                          </DataTable.Cell>
                          <DataTable.Cell style={{flex: 0.7}}>
                            <View>
                              <IconButton
                                icon="delete"
                                color={Colors.red500}
                                size={20}
                                onPress={() => createTwoButtonAlert(u.id)}
                              />
                            </View>
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
              No Bills Uploaded
            </Text>
          ))}

        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            HISTORY
          </Text>
        </View>

        {userReportListHistory?.length != 0 &&
        userReportListHistory !== undefined ? (
          <View style={{paddingLeft: 2, paddingRight: 2}}>
            <ScrollView>
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
                      // width: 100,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Type
                    </Text>
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      // width: 100,
                      flex: 1.5,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      {'   '}Remarks
                    </Text>
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      // width: 100,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Upload Date
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={{
                      // width: 20,
                      flex: 0.7,
                    }}
                  />
                </DataTable.Header>

                {userReportListHistory?.map((u, i) => {
                  let testDate1 = moment(u.billing_time).format('DD/MM/YY');

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
                            // width: 150,
                            flex: 1,
                            padding: 3,
                          }}>
                          <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL(u.file_url)}>
                            {u.bill_file_name}
                          </Text>
                        </DataTable.Cell>

                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            // width: 150,
                            flex: 1.5,
                            padding: 3,
                          }}>
                          {u.remark}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            // width: 150,
                            flex: 1,
                            padding: 3,
                          }}>
                          {testDate1}
                        </DataTable.Cell>
                        <DataTable.Cell style={{flex: 0.7}}>
                          <View>
                            <IconButton
                              icon="delete"
                              color={Colors.red500}
                              size={20}
                              onPress={() => createTwoButtonAlert(u.id)}
                            />
                          </View>
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
            No Bills Uploaded
          </Text>
        )}

        <View />
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
