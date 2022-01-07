/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,ImageBackground, TextInput, Image, SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';
import Styles from './login/styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from './../../navigator/constants';
import { verifyUser } from './../../utils/api';
import { App, Auth } from './../../navigator/app-navigator';
import { saveUserId, saveUserName, saveToken } from './../../utils/api';
import RNRestart from 'react-native-restart';
import DatePicker from 'react-native-date-picker';
import { Alert } from 'react-native';
import PageLogo from '../pageLogo';

const onVerification = async(username: string, date: Date, navigation: any) => {

  const showAlert1 = (resMsg: any) => {
    console.log('resMsg', resMsg);
    Alert.alert(
        'Alert',
        'Username or Date of Birth do not match',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
    );
};

  const res = await verifyUser(username, date);
  if (res?.data?.is_success){
    const saveUser = await saveUserId(res.data.data.user_id);
    navigation.navigate(ScreenNames.ResetPassword);
  }
  else {
    const resMsg = res?.response_message;
    showAlert1(resMsg);
  }
 };

  const Header = () => {
  const navigation = useNavigation();

  const [date1, setDate1] = useState(new Date());
  const image = require('./../../assets/logo/background.jpeg');

  return (

    <ImageBackground
    source={image}
    style={{flex: 1, width: null, height: null}}>
    <SafeAreaView>
      <PageLogo />
      <KeyboardAvoidingView>
       <ScrollView>
      <Formik
        initialValues={{
          username: '',
          date: date1,
        }}
        onSubmit={values => {
          onVerification(values.username, date1, navigation);
        }}
      >
        {formikProps => (
          <React.Fragment>
            <View style={Styles.mainContainer} >

              <View style={Styles.container}>

                <View style={Styles.loginContainer}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: '#D3ECF9'}}> PLEASE VERIFY YOUR DETAILS</Text>
                <Text style={{textAlign: 'center',  fontSize: 18, marginBottom: 10, color: '#D3ECF9', fontWeight: 'bold'}}>Enter your username</Text>
                  <TextInput
                    defaultValue={formikProps.values.username}
                    placeholder="Username"
                    style={[Styles.inputLabel1, Styles.textStyle]}
                    // keyboardType="email-address"
                    onChangeText={formikProps.handleChange('username')}
                    onBlur={formikProps.handleBlur('username')}
                  />
                  <Text style={Styles.formErrorMessage}>
                    {formikProps.touched.username && formikProps.errors.username}
                  </Text>


<Text style={{textAlign: 'center',  fontSize: 18, marginBottom: 10, color: '#D3ECF9', fontWeight: 'bold'}}>Select your date of birth</Text>
              <DatePicker
                    date={date1}
                    onDateChange={setDate1}
                    mode="date"
                    style={{alignContent:'center', alignSelf: 'center'}}
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

</ScrollView>
</KeyboardAvoidingView>

    </SafeAreaView>
    </ImageBackground>

  );
};

export default Header;
