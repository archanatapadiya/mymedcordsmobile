/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import Styles from './styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../navigator/constants';
import { login } from '../../../utils/api';
import { App, Auth } from '../../../navigator/app-navigator';
import { saveUserId, saveUserName, saveToken } from '../../../utils/api';
import RNRestart from 'react-native-restart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const validationSchema = yup.object().shape({
  // email: yup
  //   .string()
  //   .label('Email')
  //   .email('Invalid Email')
  //   .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(5, 'The password must be more than 5 characters.'),
});

const onLogin = async (email: string, password: string, navigation: any) => {
  const res = await login(email, password);
  if (res?.is_success) {
    const saveUser = await saveUserId(res?.data?.user_id);
    const saveLoggedUserName = await saveUserName(res?.data?.first_name);
    const saveUserToken = await saveToken(res?.data?.token);
    RNRestart.Restart();
  }
  if (res == undefined) {
    Alert.alert('Login Error', 'Invalid username or password', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }
};

const Header = () => {
  const [visible, setVisibility] = useState(true);
  const navigation = useNavigation();

  const eyeIcon = () => {
    setVisibility(!visible);
  };

  const forgotPassword = () => {
    navigation.navigate(ScreenNames.ForgotPassword);
  };
  const image = require('../../../assets/logo/background.jpeg');


  const Logo = require('../../../assets/logo/MyMedCordsTransparent.png');
  return (
    <ImageBackground
    source={image}
    style={{ flex: 1,
      width: null,
      height: null,
      }}
  >
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              onLogin(values.email, values.password, navigation);
            }}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <React.Fragment>
                <View style={Styles.mainContainer}>
                  <Image
                    source={Logo}
                    style={Styles.logoStyle}
                    resizeMode="contain"
                  />
                  <Text style={Styles.headingTextStyle}>MYMEDCORDS</Text>
                  <Text style={Styles.secondaryTextStyle}>
                    My Medical Records
                  </Text>
                  <View style={Styles.container}>
                    <View style={Styles.loginContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 80,
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#D3ECF9' }}>
                          LOGIN
                        </Text>
                        <TextInput
                          defaultValue={formikProps.values.email}
                          // placeholder="Username"
                          style={[Styles.inputLabel, Styles.textStyle]}
                          // keyboardType="email-address"
                          onChangeText={formikProps.handleChange('email')}
                          onBlur={formikProps.handleBlur('email')}
                        />
                      </View>
                      <Text style={Styles.formErrorMessage}>
                        {formikProps.touched.email && formikProps.errors.email}
                      </Text>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginLeft: '-14%',
                        }}
                      >
                        <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#D3ECF9' }}>
                          PASSWORD
                        </Text>

                        <TextInput
                          secureTextEntry={visible}
                          // placeholder="Password"
                          value={formikProps.values.password}
                          style={[Styles.inputLabel, Styles.textStyle]}
                          onChangeText={formikProps.handleChange('password')}
                          maxLength={120}
                          onBlur={formikProps.handleBlur('password')}
                        />

                {visible ?
                  <MaterialCommunityIcons
                        onPress={()=> eyeIcon()}
                        name="eye"
                        color="#0F577C"
                        size={20}
                        style={{  marginLeft: '-15%', marginTop: 12}}
                      />
                      :
                      <MaterialCommunityIcons
                        onPress={()=> eyeIcon()}
                        name="eye-off"
                        color="#0F577C"
                        size={20}
                        style={{  marginLeft: '-15%', marginTop: 12}}
                      />
}
                      </View>

                      </View>
                      <Text style={Styles.formErrorMessage}>
                        {formikProps.touched.password &&
                          formikProps.errors.password}
                      </Text>

                      <View style={Styles.forgotContainer}>
                        <TouchableOpacity onPress={() => forgotPassword()}>
                          <Text style={Styles.forgotTextStyle}>
                            Forgot password
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <MaterialCommunityIcons
                        onPress={formikProps.handleSubmit}
                        name="arrow-right-circle"
                        color="#D3ECF9"
                        size={50}
                        style={{ marginTop: '-8%', marginLeft: '28%' , width: 50}}
                      />

                    </View>
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

    <View style={{
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0}}>
        <Text style={{color:'#D3ECF9'}}>
                        v1.0 Beta
                      </Text>
                      <Text style={{color:'#D3ECF9'}}>
                       MEDCLINIQ
                      </Text>
                      </View>
    </ImageBackground>
  );
};

export default Header;
