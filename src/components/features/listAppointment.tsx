/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import { Button, Snackbar } from 'react-native-paper';
import { navigate, push } from '../../navigator/NavigationService';

import { ScreenNames } from '../../navigator/constants';
import PageLogo from '../pageLogo';
import { useNavigation } from '@react-navigation/native';
import { getUserName, getUserId, fetchUserDetails } from '../../utils/api';
import { logout, saveUserId } from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native-paper';

import ReactNativeAN from 'react-native-alarm-notification';
import DateTimePicker from '@react-native-community/datetimepicker';

import Styles from './login/styles';

import {
  LocalNotification,
  LocalNotificationSchedule,
  getScheduledNotification,
} from '../../services/localPushController';

import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const More = ({ route }) => {
  const image = require('./../../assets/logo/background.jpeg');
  const [alarms, setAlarms] = useState('');

  const isFocused = useIsFocused();

  console.log('scheduledAlarms--->', JSON.stringify(alarms[0]?.data));

const getAll = () => {
  getScheduledNotification();
};

  const deleteIcon = (id) => {
    const deleteReminder = async (id) => {
      ReactNativeAN.deleteAlarm(id);

      const scheduledAlarms = await ReactNativeAN.getScheduledAlarms();
      setAlarms(scheduledAlarms);
    };
    Alert.alert('Delete reminder?', 'Press OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteReminder(id) },
    ]);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const scheduledAlarms = await ReactNativeAN.getScheduledAlarms();
      setAlarms(scheduledAlarms);
      console.log(
        'scheduledAlarms--->',
        scheduledAlarms
      );
    }
    fetchMyAPI();
  }, [isFocused]);



  const Item = ({
    id,
    title,
    message,
    day,
    month,
    year,
    hour,
    minute,
    data,
  }) => {

    var timePart = '' + hour + ':' + minute;

    const testdate = new Date();
    const datePart = moment(testdate).format('yyyy-MM-DD');

var momentObj = moment(datePart + timePart, 'YYYY-MM-DDLT');

var timetest = moment(momentObj).format('hh:mm A');


    return (
    <View style={styles.item}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '80%' }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{fontSize: 16}}>{data.replace(';;', '').replace('[', '').replace(']','').split('==>')[1]}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'right' }}>
            <MaterialCommunityIcons
              onPress={() => deleteIcon(id)}
              name="delete"
              color="#0F577C"
              size={30}
            />
          </Text>
        </View>
      </View>

      <Text>
      {timetest}
      </Text>
    </View>
    );
  };

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      title={item.title}
      message={item.message}
      day={item.day}
      month={item.month}
      year={item.year}
      hour={item.hour}
      minute={item.minute}
      data={item.data}
    />
  );

  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, width: null, height: null }}
    >
      <PageLogo />

      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.BookAppointmentScreen)}
          name="plus-circle"
          color="#D3ECF9"
          size={30}
          style={{ marginTop: 18, marginLeft: 10 }}
        />
        <View
          style={{
            flex: 1,
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D3ECF9' }}  onPress={() => navigate(ScreenNames.BookAppointmentScreen)}>
            ADD NEW REMINDER
          </Text>

          {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D3ECF9' }}  onPress={() => getAll()}>
            Get All Notif
          </Text> */}

        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.MoreScreen)}
          name="arrow-left-circle"
          color="#D3ECF9"
          size={30}
          style={{ marginTop: 18, marginLeft: 10 }}
        />
        <View
          style={{
            flex: 1,
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D3ECF9' }}>
            LIST OF REMINDERS
          </Text>
        </View>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            marginTop: 10,
            paddingLeft: '2%',
          }}
        >
          <FlatList
            data={alarms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>

      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          // position: 'absolute',
          bottom: 0,
        }}
      >
        <Text style={{ color: '#D3ECF9' }}>v2.0</Text>
        <Text style={{ color: '#D3ECF9' }}>MEDCLINIQ</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default More;
