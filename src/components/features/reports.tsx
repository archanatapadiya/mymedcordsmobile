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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {getUserReports, getUserId} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';
import {DataTable} from 'react-native-paper';

interface ReportData {
  descreption: string;
  lab_id__name: string;
  file_name: string;
  file_url: string;
  event_time: string;
}

const Reports = ({route}) => {
  const {type, hospName, logo, hospitalId, phoneNumber} = route.params;

  let typeUpper = 'CURRENT';
  if (type == 'history') {
    typeUpper = 'HISTORY';
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
      if (type == 'current') {
        reportsData = userReports.data.current;
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
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>REPORTS</Text>
        </View>

        <View />

        <DataTable style={{paddingLeft: 10, paddingRight: 10, borderWidth: 2}}>
          <DataTable.Header
            style={{paddingLeft: 50, paddingRight: 50, borderBottomWidth: 2}}>
            <DataTable.Title>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Date</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Reports </Text>
            </DataTable.Title>
          </DataTable.Header>

          {userReportList?.map((u, i) => {
            return (
              <View key={i}>
                <DataTable.Row style={{paddingLeft: 30, paddingRight: 50}}>
                  <DataTable.Cell>{u.event_time}</DataTable.Cell>
                  <DataTable.Cell numeric>
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
  head: {height: 40, backgroundColor: '#f1f8ff', fontSize: 16},
  text: {textAlign: 'center', textAlignVertical: 'center', fontSize: 14},
});

export default Reports;
