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
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {
  getUserReports,
  getUserId,
  getUserDocuments,
  checkSpace,
  deleteUserReports,
} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';
import {DataTable, IconButton} from 'react-native-paper';
import PageLogo from '../pageLogo';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import Modal from 'react-native-modal';

interface ReportData {
  descreption: string;
  lab_id__name: string;
  file_name: string;
  file_url: string;
  event_time: string;
}

const Reports = ({route}) => {
  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;

  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState(false);
  const [modalTime, setModalTime] = useState('');

  const [fileName, setFileName] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [health, setHealth] = useState('');
  const [desc, setDesc] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openFile = () => {
    setModalVisible(!isModalVisible);
    Linking.openURL(fileUrl);
  };

  const toggleModal1 = (
    fileName1: any,
    uploadDate1: any,
    reportDate1: any,
    doctor1: any,
    fileUrl1: any,
    health1: any,
    desc1: any,
  ) => {
    setModalVisible(true);
    setFileName(fileName1);
    setUploadDate(uploadDate1);
    setReportDate(reportDate1);
    setDoctor(doctor1);
    setFileUrl(fileUrl1);
    setHealth(health1);
    setDesc(desc1);
  };

  const image = require('./../../assets/logo/background.jpeg');

  const [userReportList, setUserReportList] = useState<ReportData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);

  const [reportCount, setReportCount] = useState(0);

  console.log('reportCount', reportCount);
  let reportsData: any = [];

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    return userId;
  };

  const createTwoButtonAlert = (id: any) => {
    console.log('id in createButtonAlert', id);
    Alert.alert('Delete report', 'Press OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteReports(id)},
    ]);
  };

  const deleteReports = async (id: any) => {
    const res = await deleteUserReports(id);
    if (res.is_success) {
      const userReports = await getUserDocuments(loggedInUserId);

      console.log('userReportsuserReports', userReports);
      setUserReportList(userReports?.data?.my_doc);

      const space = await checkSpace(loggedInUserId);
      setReportCount(space?.data?.data);
    }
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  useEffect(() => {
    const userReportsData = async (userId: any) => {
      const userReports = await getUserDocuments(userId);
      reportsData = userReports?.data?.my_doc;

      setUserReportList(reportsData);
      return reportsData;
    };

    const checkSpaceUtil = async (loggedInUserId: any) => {
      const space = await checkSpace(loggedInUserId);
      setReportCount(space?.data?.data);
    };

    if (loggedInUserId != 0 && isFocused) {
      const userReports = userReportsData(loggedInUserId);
      const space1 = checkSpaceUtil(loggedInUserId);
    }
  }, [loggedInUserId, isFocused]);

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            REPORTS: {reportCount} / 50
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() =>
            navigate(ScreenNames.MyDocumentAddScreen, {
              reportCount: reportCount,
            })
          }
          name="plus-circle"
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
            style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}
            onPress={() => navigate(ScreenNames.MyDocumentAddScreen)}>
            ADD DOCUMENTS
          </Text>
        </View>
      </View>

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
            MY DOCUMENTS
          </Text>
        </View>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <View /> */}
        {userReportList?.length != 0 && userReportList !== undefined ? (
          <View style={{paddingLeft: 3, paddingRight: 3}}>
            <ScrollView>
              <DataTable
                style={{
                  width: '100%',
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
                  {/* <DataTable.Title
                    style={{
                      width: 80,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      Date
                    </Text>
                  </DataTable.Title> */}

                  <DataTable.Title
                    style={{
                      // width: 80,
                      flex: 1.2,
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
                      // width: 150,
                      flex: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      {'    '}
                      Doctor
                    </Text>
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      // width: 80,
                      flex: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#228EC7',
                      }}>
                      {'   '}
                      Description
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={{
                      width: 20,
                    }}
                  />
                </DataTable.Header>

                {userReportList?.map((u, i) => {
                  let testDate1 = moment(u.testdate).format('DD/MM/YY');

                  return (
                    <View key={i}>
                      <DataTable.Row
                        style={{
                          // paddingLeft: 30,
                          // paddingRight: 30,
                          backgroundColor: '#67C2F1',
                        }}>
                        {/* <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            width: 90,
                            // padding: 5,
                          }}>
                          {event_time1}
                        </DataTable.Cell> */}

                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            // width: 70,
                            // padding: 3,
                            flex: 1.2,
                          }}>
                          {testDate1}
                        </DataTable.Cell>

                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            // width: 150,
                            flex: 2,
                            padding: 3,
                          }}>
                          {u.dr_name}
                        </DataTable.Cell>

                        <DataTable.Cell
                          style={{
                            borderRightWidth: 2,
                            borderColor: '#0A4A6B',
                            flex: 2,
                            // width: 105,
                            padding: 3,
                          }}>
                          <Text
                            style={{color: 'blue'}}
                            onPress={() =>
                              toggleModal1(
                                u.file_name,
                                u.event_time,
                                u.testdate,
                                u.dr_name,
                                u.file_url,
                                u.health_center,
                                u.description,
                              )
                            }
                            // onPress={() => Linking.openURL(u.file_url)}>
                          >
                            <Modal isVisible={isModalVisible}>
                              <View style={{flex: 1, marginTop: '50%'}}>
                                <View style={{backgroundColor: '#0099ff'}}>
                                  <MaterialCommunityIcons
                                    onPress={toggleModal}
                                    name="close"
                                    color="red"
                                    size={30}
                                    style={{
                                      textAlign: 'right',
                                    }}
                                  />
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 24,
                                      textDecorationLine: 'underline',
                                      textAlign: 'center',
                                      color: '#D3ECF9',
                                    }}>
                                    File Details
                                  </Text>

                                  <Text
                                    style={{fontSize: 22, color: '#D3ECF9'}}>
                                    {'\n'}{' '}
                                    <Text style={{fontWeight: 'bold'}}>
                                      Type / Modality:
                                    </Text>{' '}
                                    {fileName} {'\n'}
                                    <Text style={{fontWeight: 'bold'}}>
                                      {' '}
                                      Doctor:{' '}
                                    </Text>{' '}
                                    {doctor}
                                    {'\n'}
                                    <Text style={{fontWeight: 'bold'}}>
                                      {' '}
                                      Health Center:{' '}
                                    </Text>{' '}
                                    {health}
                                    {'\n'}
                                    <Text style={{fontWeight: 'bold'}}>
                                      {' '}
                                      Description:{' '}
                                    </Text>{' '}
                                    {desc}
                                    {'\n'}
                                    <Text style={{fontWeight: 'bold'}}>
                                      {' '}
                                      Upload Date:
                                    </Text>{' '}
                                    {uploadDate}
                                    {'\n'}
                                    <Text style={{fontWeight: 'bold'}}>
                                      {' '}
                                      Report Date:
                                    </Text>{' '}
                                    {reportDate}
                                    {'\n'}
                                  </Text>

                                  {/* <Button
                                    title="->"
                                    onPress={() => Linking.openURL(fileUrl)}
                                  /> */}

                                  <MaterialCommunityIcons
                                    // onPress={() => Linking.openURL(fileUrl)}
                                    onPress={openFile}
                                    name="arrow-right-circle"
                                    color="#D3ECF9"
                                    size={50}
                                    style={{
                                      alignItems: 'center',
                                      alignSelf: 'center',
                                      alignContent: 'center',
                                    }}
                                  />
                                  <Text>{'\n'}</Text>
                                </View>
                              </View>
                            </Modal>
                            {u.file_name}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
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
