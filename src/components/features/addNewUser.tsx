/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
//  import type {Node} from 'react';
import { View,StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, Alert, Image, SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Formik } from 'formik';
import { Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Styles from './login/styles';
import dayjs from 'dayjs';

import Header from '../header';
import HospitalHeader from '../hospitalHeader';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {getUserBills, getUserId} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { editProfile, saveUserName , registerUser} from './../../utils/api';
import PageLogo from '../pageLogo';
import UploadImage from './uploadImage';
import RNRestart from 'react-native-restart';
import DateTimePicker from '@react-native-community/datetimepicker';

interface BillingData {
  amount: string;
  bill_file_name: string;
  file_url: string;
  billing_time: string;
}

function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [text, setText] = useState('');

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
  };
}

const Billing = () => {
  const navigation = useNavigation();
  const image = require('./../../assets/logo/background.jpeg');

  const input2 = useInput(new Date());

      let dateOfBirth = dayjs(input2.date).format('YYYY-MM-DD');

  const onLogin = async(values: any, navigation: any) => {

    console.log('values in register profile', input2);

    let params = {
      ...values , dateOfBirth   };
    const res = await registerUser(params);
    console.log('userData in registerUser', res);

    if (!res?.is_success){
      Alert.alert(
        'Alert',
        'Username already exists',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
    );
    }

    if (res?.is_success){
      console.log('res123123', res);
      navigation.navigate(ScreenNames.HomeScreen);
    }

   };

  return (
    <ImageBackground
    source={image}
    style={{flex: 1, width: null, height: null}}>
      <PageLogo />

     <ScrollView>


    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email:'',
        dob:'',
        password:'',
        address:'',
        zip_code: '',
        phone_number: '',
        blood_group: null,
        blood_pressure: null,
        height: null,
        weight: null,
        // bmi: userData?.bmi || null,
        pulse: null,
        health_id: null,
      }}
      onSubmit={values => {
       onLogin(values, navigation);
      }}
    >
      {formikProps => (
        <React.Fragment>
          <View style={Styles.mainContainer} >

            <View style={Styles.container}>
              <View >

              <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: '#D3ECF9',
                          }}>
                          ADD NEW USER
                        </Text>
                <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}> {'\n\n'}First Name</Text>
                <TextInput
                  defaultValue={formikProps.values.first_name}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('first_name')}
                  onBlur={formikProps.handleBlur('first_name')}
                />


                <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Last Name</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.last_name}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('last_name')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('last_name')}
                />

{/* <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Date Of Birth</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.dob}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('dob')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('dob')}
                /> */}

<Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Date Of Birth: {input2.date.toLocaleDateString()}
                  </Text>

                  <Button
                    color="#fff"
                    onPress={input2.showDatepicker}
                    mode="contained"
                    labelStyle={Styles.nextButtonText2}
                    style={Styles.nextButtonContainer2}>
                    {'  '}Select Date Of Birth{'  '}
                  </Button>
                  {input2.show && (
                    <DateTimePicker
                      testID="dateTimePicker2"
                      value={input2.date}
                      mode={input2.mode}
                      is24Hour={true}
                      display="default"
                      onChange={input2.onChange}
                    />
                  )}


<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Phone Number</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.phone_number}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('phone_number')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('phone_number')}
                />

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Email</Text>
                <TextInput
                  // secureTextEntry={true}
                  // placeholder="Password"
                  value={formikProps.values.email}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('email')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('email')}
                />

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Password</Text>
                <TextInput
                  // secureTextEntry={true}
                  // placeholder="Password"
                  value={formikProps.values.password}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('password')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('password')}
                />


              <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Address</Text>
                <TextInput
                  // secureTextEntry={true}
                  // placeholder="Password"
                  value={formikProps.values.address}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('address')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('address')}
                />


              <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Zip Code</Text>
                <TextInput
                  value={formikProps.values.zip_code}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('zip_code')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('zip_code')}
                />
<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9', fontWeight: 'bold', textDecorationLine:'underline'}}>{'\n'}HEALTH DETAILS{'\n'}</Text>

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Health ID</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.health_id}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('health_id')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('health_id')}
                />

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Blood Group</Text>
                <TextInput
                  value={formikProps.values.blood_group}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('blood_group')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('blood_group')}
                />

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Last Blood pressure</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.blood_pressure}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('blood_pressure')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('blood_pressure')}
                />

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Height (cm)</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.height}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('height')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('height')}
                />

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Weight (kg)</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.weight}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('weight')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('weight')}
                />

{/* <Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>BMI</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.bmi}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('bmi')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('bmi')}
                /> */}

<Text style={{marginLeft: 10, fontSize: 14, color: '#D3ECF9'}}>Pulse</Text>
                <TextInput

                  // placeholder="Password"
                  value={formikProps.values.pulse}
                  style={[Styles.inputLabel, Styles.textStyle]}
                  onChangeText={formikProps.handleChange('pulse')}
                  maxLength={120}
                  onBlur={formikProps.handleBlur('pulse')}
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

</ScrollView>


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

export default Billing;
