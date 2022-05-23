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
  FlatList,
  ImageBackground,
  Alert,
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

interface ReportData {
  descreption: string;
  lab_id__name: string;
  file_name: string;
  file_url: string;
  event_time: string;
}

const Reports = ({route}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({event_time, dr_name, file_name, testdate, file_url}) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        <Text style={{fontWeight: 'bold'}}>Type / Modality:</Text>
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL(file_url)}>
          {' '}
          {file_name}
        </Text>
      </Text>
      <Text style={styles.title}>
        <Text style={{fontWeight: 'bold'}}>Date:</Text> {event_time}
      </Text>
      <Text style={styles.title}>
        <Text style={{fontWeight: 'bold'}}>Doctor:</Text> {dr_name}
      </Text>
      <Text style={styles.title}>
        <Text style={{fontWeight: 'bold'}}>Report Date:</Text> {testdate}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      event_time={item.event_time}
      dr_name={item.dr_name}
      file_name={item.file_name}
      testdate={item.testdate}
      file_url={item.file_url}
    />
  );

  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;

  const isFocused = useIsFocused();

  const image = require('./../../assets/logo/background.jpeg');

  const [userReportList, setUserReportList] = useState<ReportData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);

  const [reportCount, setReportCount] = useState(0);

  console.log('userReportListuserReportList', userReportList);

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
          <View style={{paddingLeft: 5, paddingRight: 5}}>
            <ScrollView horizontal>
              <FlatList
                data={userReportList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
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

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 26,
  },
  title: {
    fontSize: 18,
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
