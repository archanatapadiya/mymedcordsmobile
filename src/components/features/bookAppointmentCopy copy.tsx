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

import Styles from './login/styles';

import {
  LocalNotification,
  LocalNotificationSchedule,
} from '../../services/localPushController';

import moment from 'moment';

const More = ({ route }) => {
  const image = require('./../../assets/logo/background.jpeg');

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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
    const fireDate = moment(date).add(1, 'days').format('DD-MM-yyyy hh:mm:ss');

    console.log('fireDate', fireDate);
    const alarmNotifData = {
      title: 'Appointment',
      message: values.description,
      channel: 'my_channel_id',
      small_icon: 'ic_launcher',
      data: { doctor: values.doctor },
    };

    const alarm = await ReactNativeAN.scheduleAlarm({
      ...alarmNotifData,
      fire_date: fireDate,
    });
    console.log('alarm--->', alarm);
    console.log('alarm date--->', date);

    LocalNotificationSchedule(date, alarmNotifData);
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
            BOOK AN APPOINTMENT
          </Text>
        </View>
      </View>
          <Formik
            initialValues={{
              description: '',
              doctor: '',
            }}
            onSubmit={(values) => {
              handleButtonPress(values);
            }}
          >
            {(formikProps) => (
              <React.Fragment>
                <View style={Styles.mainContainer}>
                  <View style={Styles.container}>
                    <View style={Styles.loginContainer}>
                    <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          color: '#D3ECF9',
                        }}
                      >
                        Selected Date: {DateOnly}
                      </Text>
                      <Button
                        color="#fff"
                        onPress={showDatepicker}
                        mode="contained"
                        labelStyle={Styles.nextButtonText2}
                        style={Styles.nextButtonContainer2}
                      >
                        {'  '}Select a date{'  '}
                      </Button>

                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          color: '#D3ECF9',
                        }}
                      >
                        Selected Time: {TimeOnly}
                      </Text>
                      <Button
                        color="#fff"
                        onPress={showTimepicker}
                        mode="contained"
                        labelStyle={Styles.nextButtonText2}
                        style={Styles.nextButtonContainer2}
                      >
                        {'  '}Select a time{'  '}
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

                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          color: '#D3ECF9',
                        }}
                      >
                        Doctor
                      </Text>
                      <TextInput
                        value={formikProps.values.doctor}
                        style={[Styles.inputLabel, Styles.textStyle]}
                        onChangeText={formikProps.handleChange('doctor')}
                        maxLength={120}
                        onBlur={formikProps.handleBlur('doctor')}
                      />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          color: '#D3ECF9',
                        }}
                      >
                        Description
                      </Text>
                      <TextInput
                        value={formikProps.values.description}
                        style={[Styles.inputLabel, Styles.textStyle]}
                        onChangeText={formikProps.handleChange('description')}
                        maxLength={120}
                        onBlur={formikProps.handleBlur('description')}
                      />

                      <Button
                        color="#fff"
                        onPress={formikProps.handleSubmit}
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

export default More;
