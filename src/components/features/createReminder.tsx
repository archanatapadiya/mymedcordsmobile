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

import ReactNativeAN from 'react-native-alarm-notification';
import WeekdayPicker from 'react-native-weekday-picker';
// import {TimePicker} from 'react-native-simple-time-picker';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';


import Styles from './login/styles';

import moment from 'moment';

const More = ({ route }) => {
  const image = require('./../../assets/logo/background.jpeg');

  const [selectedDays, setSelectedDays] = useState({ 1:0, 2:0 , 3:0 , 4:0 , 5:0, 6:0, 0:0 });
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);


  const createAlarm = async (values: any) => {

    const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 8000));

    console.log('fireDate-->', fireDate);
    const alarmNotifData = {
      title: values.description,
      scheduleType: 'repeat',
      repeat_interval: 'daily',
        };

    const alarm = await ReactNativeAN.scheduleAlarm({
      ...alarmNotifData,
      fire_date: fireDate,
    });
    console.log('alarm-->', alarm); // { id: 1 }
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



          <Formik
      initialValues={{
        select_day:  '',
        select_time: '',
        description: '',

      }}

      onSubmit={values => {
        createAlarm(values);
      }}
    >
      {formikProps => (
        <React.Fragment>
          <View style={Styles.mainContainer} >

            <View style={Styles.container}>
              <View style={Styles.loginContainer}>
                <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Select Day</Text>

<WeekdayPicker
  days={selectedDays}
  onChange={(days:any) => {
    setSelectedDays(days);
  }}
  style={{padding: 30 }}
  dayStyle={{ margin: 5 }}
/>


                <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Select Time</Text>
                <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          isAmpm={true}
          textColor={'white'}
          onChange={(hours:any, minutes:any) => {
            setSelectedHours(hours);
            setSelectedMinutes(minutes);
          }}
        />


<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Description</Text>
                <TextInput
                  value={formikProps.values.description}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('description')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('description')}
                />


<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Recurring</Text>
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
