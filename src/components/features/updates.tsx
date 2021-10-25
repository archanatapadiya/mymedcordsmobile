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

interface UpdateData {
  update_time: string;
  health_update: string;
  datetime: string;
  dr_name: string;
}

const Updates = ({route}) => {
  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal1 = props => {
    setModalVisible(true);
    setModalText(props);
  };

  let typeUpper = 'CURRENT';
  if (type == 'history') {
    typeUpper = 'HISTORY';
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
      if (type == 'current') {
        UpdatesData = userUpdates.data.current;
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
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() =>
              type == 'current'
                ? navigate(ScreenNames.Current)
                : navigate(ScreenNames.History)
            }
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{typeUpper}</Text>
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
            source={{uri: logo}}
            style={styles.logoStyle}
            resizeMode="contain"
          />
          <Text style={{margin: 10, fontSize: 30, fontWeight: 'bold'}}>
            {hospName}
          </Text>

          <CallHospital phonenumber={phoneNumber} />
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
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>UPDATES</Text>
        </View>

        <DataTable style={{paddingLeft: 10, paddingRight: 10, borderWidth: 2}}>
          <DataTable.Header
            style={{paddingLeft: 0, paddingRight: 0, borderBottomWidth: 2}}>
            <DataTable.Title>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Date</Text>
            </DataTable.Title>

            <DataTable.Title numeric>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Updates </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Dr. Name </Text>
            </DataTable.Title>
          </DataTable.Header>

          {userUpdatesList?.map((u, i) => {
            return (
              <View key={i}>
                <DataTable.Row style={{paddingLeft: 0, paddingRight: 0}}>
                  <DataTable.Cell>{u.datetime}</DataTable.Cell>

                  <DataTable.Cell numeric>
                    <Text
                      style={{color: 'blue'}}
                      onPress={() => toggleModal1(u.health_update)}>
                      <Modal isVisible={isModalVisible}>
                        <View style={{flex: 1, marginTop: '50%'}}>
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
                  <DataTable.Cell numeric>{u.dr_name}</DataTable.Cell>
                </DataTable.Row>
              </View>
            );
          })}
        </DataTable>
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
