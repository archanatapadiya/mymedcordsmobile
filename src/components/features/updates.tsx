import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {navigate} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUserUpdates, getUserId} from '../../utils/api';
import CallHospital from '../callHosp';
import _ from 'lodash';
import {DataTable} from 'react-native-paper';
import Modal from 'react-native-modal';
import PageLogo from '../pageLogo';

interface UpdateData {
  update_time: string;
  health_update: string;
  datetime: string;
  dr_name: string;
}

const Updates = ({route}) => {
  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;
  const image = require('./../../assets/logo/background.jpeg');

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState(false);
  const [modalTime, setModalTime] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal1 = (props: any, props1: any) => {
    console.log('props--->', props1);
    setModalVisible(true);
    setModalText(props);
    setModalTime(props1);
  };

  let typeUpper = 'CURRENT';
  if (type == 'history') {
    typeUpper = 'HISTORY';
  }
  if (type == 'opd') {
    typeUpper = 'CLINIC UPDATES (OPD) ';
  }

  const [userUpdatesList, setUserUpdatesList] = useState<UpdateData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  let UpdatesData: any = [];

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    return userId;
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  useEffect(() => {
    const userUpdatesData = async (userId: any) => {
      const userUpdates = await getUserUpdates(userId, hospitalId);
      console.log('userUpdates--->', userUpdates);

      if (type == 'current') {
        UpdatesData = userUpdates.data.current;
      } else if (type == 'opd') {
        UpdatesData = userUpdates.data.opd;
      } else {
        UpdatesData = userUpdates.data.history;
      }
      setUserUpdatesList(UpdatesData);
      return UpdatesData;
    };

    if (loggedInUserId != 0) {
      const userReports = userUpdatesData(loggedInUserId);
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
            UPDATES
          </Text>
        </View>

        {userUpdatesList?.length != 0 && userUpdatesList !== undefined ? (
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <DataTable style={{borderWidth: 2, borderColor: '#0A4A6B'}}>
              <DataTable.Header
                style={{
                  // paddingLeft: 50,
                  // paddingRight: 30,
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
                    Updates{' '}
                  </Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#228EC7',
                    }}>
                    Doctor{' '}
                  </Text>
                </DataTable.Title>
              </DataTable.Header>

              {userUpdatesList?.map((u, i) => {
                return (
                  <View key={i}>
                    <DataTable.Row
                      style={{
                        backgroundColor: '#67C2F1',
                      }}>
                      <DataTable.Cell>{u.datetime}</DataTable.Cell>

                      <DataTable.Cell>
                        <Text
                          style={{color: 'blue'}}
                          onPress={() =>
                            toggleModal1(u.health_update, u.datetime)
                          }>
                          <Modal isVisible={isModalVisible}>
                            <View style={{flex: 1, marginTop: '50%'}}>
                              <Button title={modalTime} onPress={toggleModal} />
                              <Button title={modalText} onPress={toggleModal} />
                              <Button
                                title="Close"
                                onPress={toggleModal}
                                color="red"
                              />
                            </View>
                          </Modal>
                          {u.health_update}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>{u.dr_name}</DataTable.Cell>
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
            No Health Updates Uploaded
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
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {textAlign: 'center', textAlignVertical: 'center', fontSize: 14},
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#DDEFE6',
  },
  TableText: {
    margin: 10,
  },
});

export default Updates;
