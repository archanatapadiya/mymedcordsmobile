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
} from 'react-native';
import { Formik } from 'formik';
import { Button, Snackbar } from 'react-native-paper';

import { ScreenNames } from '../../navigator/constants';
import PageLogo from '../pageLogo';
import { useNavigation } from '@react-navigation/native';
import { getUserName, getUserId, fetchUserDetails } from '../../utils/api';
import { logout, saveUserId } from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native-paper';
import {navigate, push} from '../../navigator/NavigationService';

import ReactNativeAN from 'react-native-alarm-notification';
import DateTimePicker from '@react-native-community/datetimepicker';
import NotificationScheduler from './notificationSchedular';

import Styles from './login/styles';

import {
  LocalNotification,
  LocalNotificationSchedule,
  createChannel,
  // getScheduledNotification,
} from '../../services/localPushController';

import moment from 'moment';

const More = ({ route }) => {
  const image = require('./../../assets/logo/background.jpeg');


  const data = [
    { id: 1, txt: 'Mon', isChecked: false },
    { id: 2, txt: 'Tue', isChecked: false },
    { id: 3, txt: 'Wed', isChecked: false },
    { id: 4, txt: 'Thu', isChecked: false },
    { id: 5, txt: 'Fri', isChecked: false },
    { id: 6, txt: 'Sat', isChecked: false },
    { id: 7, txt: 'Sun', isChecked: false },
  ];

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const [fileValue, setFileValue] = React.useState('daily');
  const [products, setProducts] = useState(data);
  const [weekDay, setWeekDay] = useState('1');


  const DateOnly = moment(date).format('DD-MM-yyyy');
  const TimeOnly = moment(date).format('hh:mma');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleButtonPress = async (values: any) => {

    const fireDate = moment(date).add(1, 'days').format('DD-MM-yyyy HH:mm:ss');

    console.log('fireDate',date,  fireDate);

    let temp1 = products.filter(function (el) {
      return el.isChecked == true;
    });

    let temp = temp1.map((a) => a.txt);

    const alarmNotifData = {
      title: values.reminder,
      message: 'Reminder',
      channel: 'channel_id',
      small_icon: 'ic_launcher',
      data: { selectedDays: temp },
    };

    const alarm = await ReactNativeAN.scheduleAlarm({
      ...alarmNotifData,
      fire_date: fireDate,
    });

    // getScheduledNotification();

    // LocalNotificationSchedule(date, alarmNotifData);



    // var s1 = new Date();
    // var st = moment(s1).add(5, 'minutes');

    // var s2 = new Date(st);

    // let selectDays1 = [s1, s2];


    // {
    //   selectDays1?.map((u, i) => {


    //       console.log('datettt1', u);
    //       LocalNotificationSchedule(u, alarmNotifData);
    //     });
    //   }

    let selectDays = temp1.map((a) => a.id);

    {
        selectDays?.map((u, i) => {
          const testdate = moment().day(u + 0);
          const datePart = moment(testdate).format('yyyy-MM-DD');

          const timePart = date.toLocaleTimeString('IST', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          var momentObj = moment(datePart + timePart, 'YYYY-MM-DDLT');

          var dateTime = moment(momentObj).format('MMM DD YYYY HH:mm:ss');

          var datettt = new Date(dateTime);


          console.log('datettt', datettt);
          LocalNotificationSchedule(datettt, alarmNotifData);
        });
      }
      if (alarm) {
        navigate(ScreenNames.ListAppointmentScreen);
      }
  };

  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, width: null, height: null }}
    >
      <PageLogo />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            marginTop: 10,
            paddingLeft: '2%',
          }}
        >
           <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.ListAppointmentScreen)}
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
            ADD REMINDER
          </Text>
        </View>
      </View>
          <Formik
            initialValues={{
              description: '',
              doctor: '',
              reminder: '',
            }}
            onSubmit={(values) => {
              handleButtonPress(values);
            }}
          >
             {({ handleChange, handleBlur, handleSubmit, values }) => (
              <React.Fragment>
                <View style={Styles.mainContainer}>
                  <View style={Styles.container}>
                    <View style={Styles.loginContainer}>

                    <Text
                        style={{
                          // marginTop: 5,
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#D3ECF9',
                        }}
                      >
                        Name your reminder
                      </Text>

                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('reminder')}
                        onBlur={handleBlur('reminder')}
                        value={values.reminder}
                      />


<NotificationScheduler
                        setFileValue={setFileValue}
                        setProducts={setProducts}
                        setWeekDay={setWeekDay}
                        fileValue={fileValue}
                        products={products}
                        weekDay={weekDay}
                      />


<Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#D3ECF9',
                          marginTop: 10,
                        }}
                      >
                        Select Time: {TimeOnly}
                      </Text>
                      <Button
                        color="#fff"
                        onPress={showTimepicker}
                        mode="contained"
                        labelStyle={Styles.nextButtonText2}
                        style={Styles.nextButtonContainer2}
                      >
                        {'  '}Select time{'  '}
                      </Button>
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={onChange}
                        />
                      )}




                      <Button
                        color="#fff"
                        onPress={handleSubmit}
                        mode="contained"
                        labelStyle={Styles.nextButtonText1}
                        style={Styles.nextButtonContainer1}
                      >
                        {'  '}Submit{'  '}
                      </Button>
                    </View>
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D3ECF9',
    backgroundColor: 'white',
  },
});

export default More;
