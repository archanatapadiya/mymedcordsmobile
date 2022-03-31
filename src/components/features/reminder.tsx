/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

import {ScreenNames} from '../../navigator/constants';
import PageLogo from '../pageLogo';
import {useNavigation} from '@react-navigation/native';
import {getUserName, getUserId, fetchUserDetails} from '../../utils/api';
import {logout, saveUserId} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native-paper';
import { createAlarm, getAlarms } from 'react-native-simple-alarm';

import ReactNativeAN from 'react-native-alarm-notification';

import moment from 'moment';
import { LocalNotification, LocalNotificationSchedule } from '../../services/localPushController';



const More = ({route}) => {
  const image = require('./../../assets/logo/background.jpeg');
  const navigation = useNavigation();

  const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 5000));

  const alarmNotifData = {
    title: 'My Notification Title',
    message: 'My Notification Message',
    channel: 'my_channel_id',
    small_icon: 'ic_launcher',

    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
      data: { foo: 'bar' },
  };



  const createAlarm = async () => {
    //Schedule Future Alarm
    const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
    LocalNotification();
    console.log('alarm-->',alarm); // { id: 1 }
  };

  const getAlarms = async () => {
  const alm = await ReactNativeAN.getScheduledAlarms();
  console.log('alm--->', alm);
  };


  return (
    <ImageBackground
    source={image}
    style={{flex: 1, width: null, height: null}}>
      <PageLogo />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{

            marginTop: 10,
            paddingLeft: '2%',

          }}>




          <Text style={{margin: 10, fontSize: 20, color: '#D3ECF9'}} onPress={() => navigation.navigate(ScreenNames.CreateReminderScreen)}>
          Create Alarm
      </Text>

      <Text style={{margin: 10, fontSize: 20, color: '#D3ECF9'}} onPress={() => getAlarms()}>
          Get Alarm
      </Text>


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
    // padding: 10,
    width: 150,
    alignSelf: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,

    borderRadius: 10,
    width: 60,
    height: 60,
  },
});

export default More;
