/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image, SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';
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

const onLogin = async(email: string, password: string, navigation: any) => {
  const res = await login(email, password);
  if (res?.is_success){
    const saveUser = await saveUserId(res?.data?.user_id);
    const saveLoggedUserName = await saveUserName(res?.data?.first_name);
    const saveUserToken = await saveToken(res?.data?.token);
    RNRestart.Restart();
  }
  if (res == undefined){
    Alert.alert(
      'Login Error',
      'Invalid username or password',
      [

        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]
    );
  }
 };

  const Header = () => {
  const [visible, setVisibility] = useState(true);
  const navigation = useNavigation();
  const signUp = () => {
    navigation.navigate(ScreenNames.RegisterScreen);
  };

  const forgotPassword = () =>{
    navigation.navigate(ScreenNames.ForgotPassword);
  };

  const Logo = require('../../../assets/logo/medCordsIcon.jpeg');
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
       <ScrollView keyboardShouldPersistTaps="handled">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
         onLogin(values.email, values.password, navigation);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <React.Fragment>
            <View style={Styles.mainContainer} >
              <Image
              source={ Logo }
                style={Styles.logoStyle}
                resizeMode="contain"
              />
              <View style={Styles.container}>
                <View style={Styles.loginContainer}>
                  <TextInput
                    defaultValue={formikProps.values.email}
                    placeholder="Username"
                    style={[Styles.inputLabel, Styles.textStyle]}
                    // keyboardType="email-address"
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                  />
                  <Text style={Styles.formErrorMessage}>
                    {formikProps.touched.email && formikProps.errors.email}
                  </Text>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    value={formikProps.values.password}
                    style={[Styles.inputLabel, Styles.textStyle]}
                    onChangeText={formikProps.handleChange('password')}
                    maxLength={120}
                    onBlur={formikProps.handleBlur('password')}
                  />
                  <Text style={Styles.formErrorMessage}>
                    {formikProps.touched.password && formikProps.errors.password}
                  </Text>
                  <View style={Styles.forgotContainer}>
                    <TouchableOpacity onPress={() => forgotPassword()}>
                      <Text style={Styles.forgotTextStyle}> Forgot password ? </Text>
                    </TouchableOpacity>
                  </View>

                  <Button
                    color="#fff"
                    onPress={formikProps.handleSubmit}
                    mode="contained"
                    labelStyle={Styles.nextButtonText}
                    style={Styles.nextButtonContainer}
                  >
                   {'  '}Log In{'  '}
                  </Button>

                </View>
              </View>
              <View style={Styles.bottomView}>
                <View>
                  <Text style={Styles.privacyTextStyle}>
                    By logging in you agree to our privacy policy and terms of use
                  </Text>
                </View>
                <View style={Styles.signupView}>

                  {/* <Text style={Styles.signupTextStyle}>Don't have an account? </Text>
                  <TouchableOpacity>
                    <Text style={Styles.signupStyle}
                    onPress={() => signUp()}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </React.Fragment>
        )}
      </Formik>
        {/* <View style={Styles.snackbarContainer}>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisibility(false)}
            action={{
              label: 'Log In ',
              onPress: () => {
                setVisibility(false)
              },
            }}
            duration={Snackbar.DURATION_MEDIUM}
          >
            Congratulations, your account has been successfully created.
          </Snackbar>
        </View> */}
</ScrollView>
</KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default Header;
