import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import Styles from './login/styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Button, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/constants';
import {resetPassword} from '../../utils/api';
import {App, Auth} from '../../navigator/app-navigator';
import {saveUserId, saveUserName, saveToken, getUserId} from '../../utils/api';
import PageLogo from '../pageLogo';
import {Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const onResetPass = async (
  new_password: string,
  resetUserId: string,
  navigation: any,
) => {
  const res = await resetPassword(new_password, resetUserId);

  if (res?.data?.is_success) {
    Alert.alert('Alert', 'Password changed successfully', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    navigation.navigate(ScreenNames.LoginScreen);
  }
};

const Header = () => {
  const navigation = useNavigation();
  const [resetUserId, setResetUserId] = useState('');
  const image = require('./../../assets/logo/background.jpeg');

  const [visible, setVisibility] = useState(true);

  const eyeIcon = () => {
    setVisibility(!visible);
  };
  const getUserDetails = async () => {
    const userId = await getUserId();
    setResetUserId(userId);
    return userId;
  };

  useEffect(() => {
    const userName = getUserDetails();
    return () => console.log('hello world');
  }, []);

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
                new_password: '',
              }}
              onSubmit={values => {
                onResetPass(values.new_password, resetUserId, navigation);
              }}>
              {formikProps => (
                <React.Fragment>
                  <View style={Styles.mainContainer}>
                    <View style={Styles.container}>
                      <View style={Styles.loginContainer}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginBottom: 15,
                            color: '#D3ECF9',
                          }}>
                          {' '}
                          Please enter your new password
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginLeft: -20,
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            secureTextEntry={visible}
                            defaultValue={formikProps.values.new_password}
                            placeholder="New Password"
                            style={[Styles.inputLabel1, Styles.textStyle]}
                            // keyboardType="email-address"
                            onChangeText={formikProps.handleChange(
                              'new_password',
                            )}
                            onBlur={formikProps.handleBlur('new_password')}
                          />

                          {visible ? (
                            <MaterialCommunityIcons
                              onPress={() => eyeIcon()}
                              name="eye"
                              color="#0F577C"
                              size={20}
                              style={{marginLeft: '-10%', marginTop: 12}}
                            />
                          ) : (
                            <MaterialCommunityIcons
                              onPress={() => eyeIcon()}
                              name="eye-off"
                              color="#0F577C"
                              size={20}
                              style={{marginLeft: '-10%', marginTop: 12}}
                            />
                          )}
                        </View>
                        <Text style={Styles.formErrorMessage}>
                          {formikProps.touched.new_password &&
                            formikProps.errors.new_password}
                        </Text>

                        <Button
                          color="#fff"
                          onPress={formikProps.handleSubmit}
                          mode="contained"
                          labelStyle={Styles.nextButtonText}
                          style={Styles.nextButtonContainer}>
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
