import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import Styles from './styles'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Button, Checkbox } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../../navigator/constants'
import { register } from '../../../utils/api';
import { saveUserId } from '../../../utils/api'
import RNRestart from 'react-native-restart';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label('firstName')
    .required('First Name is required'),
  lastName: yup
    .string()
    .label('lastName')
    .required('Last Name is required'),
  email: yup
    .string()
    .label('email')
    .email('Invalid Email')
    .required('Email is required'),
  mobile: yup
    .string()
    .label('mobile')
    .required('Mobile Number is required'),
  password: yup
    .string()
    .label('password')
    .required('Password is required')
    .min(5, 'The password must be more than 5 characters.'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value
    })
    .required('Confirm Password is required'),
})

const onRegister = async(email: string, firstname: string, lastname: string, 
  password: string, phone_number: string, navigation: any) => {
  const res = await register(email, firstname, lastname, 
    password, phone_number)

    if(res.is_success){
      const saveUser = await saveUserId(1)
      RNRestart.Restart();
    }
  
 }

  const Header = () => {
  const [checked, setChecked] = React.useState(false)
  const navigation = useNavigation()
  const logIn = () => {
    navigation.navigate(ScreenNames.LoginScreen)
  }

  const Logo = require('../../../assets/logo/appLogo.jpg'); 

  return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={values => {
            onRegister(values.email, values.firstName, values.lastName, 
              values.password, values.mobile, navigation);
          }
        }
          validationSchema={validationSchema}
        >
          {formikProps => (
            <React.Fragment>
              <View style={Styles.mainContainer}>
                <Image
                  source={ Logo }
                  style={Styles.logoStyle}
                  resizeMode="contain"
                />
                <View style={Styles.container}>
                  <View style={Styles.loginContainer}>
                    <TextInput
                      defaultValue={formikProps.values.firstName}
                      placeholder="First Name"
                      style={[Styles.inputLabel, Styles.textStyle]}
                      keyboardType="name-phone-pad"
                      onChangeText={formikProps.handleChange('firstName')}
                      onBlur={formikProps.handleBlur('firstName')}
                    />
                    <Text style={Styles.formErrorMessage}>
                      {formikProps.touched.firstName && formikProps.errors.firstName}
                    </Text>
                    <TextInput
                      defaultValue={formikProps.values.lastName}
                      placeholder="Last Name"
                      style={[Styles.inputLabel, Styles.textStyle]}
                      keyboardType="name-phone-pad"
                      onChangeText={formikProps.handleChange('lastName')}
                      onBlur={formikProps.handleBlur('lastName')}
                    />
                    <Text style={Styles.formErrorMessage}>
                      {formikProps.touched.lastName && formikProps.errors.lastName}
                    </Text>
                    <TextInput
                      defaultValue={formikProps.values.email}
                      placeholder="Email address"
                      style={[Styles.inputLabel, Styles.textStyle]}
                      keyboardType="email-address"
                      onChangeText={formikProps.handleChange('email')}
                      onBlur={formikProps.handleBlur('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Text style={Styles.formErrorMessage}>
                      {formikProps.touched.email && formikProps.errors.email}
                    </Text>
                    <TextInput
                      defaultValue={formikProps.values.mobile}
                      placeholder="Mobile"
                      style={[Styles.inputLabel, Styles.textStyle]}
                      keyboardType="number-pad"
                      onChangeText={formikProps.handleChange('mobile')}
                      onBlur={formikProps.handleBlur('mobile')}
                    />
                    <Text style={Styles.formErrorMessage}>
                      {formikProps.touched.mobile && formikProps.errors.mobile}
                    </Text>
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Password"
                      value={formikProps.values.password}
                      style={[Styles.inputLabel, Styles.textStyle]}
                      onChangeText={formikProps.handleChange('password')}
                      maxLength={120}
                      onBlur={formikProps.handleBlur('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Text style={Styles.formErrorMessage}>
                      {formikProps.touched.password && formikProps.errors.password}
                    </Text>
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Confirm Password"
                      value={formikProps.values.confirmPassword}
                      style={[Styles.inputLabel, Styles.textStyle]}
                      onChangeText={formikProps.handleChange('confirmPassword')}
                      maxLength={120}
                      onBlur={formikProps.handleBlur('confirmPassword')}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Text style={Styles.formErrorMessage}>
                      {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword}
                    </Text>
                  </View>
                  <View style={Styles.termsView}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked)
                      }}
                      color={'#000000'}
                    />
                    <Text style={Styles.textStyle}> Agree with </Text>
                    <TouchableOpacity>
                      <Text style={Styles.termsTextStyle} onPress={() => console.log('Hi')}>
                        terms and conditions
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {checked ? (
                    <Button
                      color="#fff"
                      onPress={formikProps.handleSubmit}
                      mode="contained"
                      labelStyle={Styles.nextButtonText}
                      style={Styles.nextButtonContainer}
                    >
                      Create Account
                    </Button>
                  ) : (
                    <Button
                      color="#fff"
                      onPress={formikProps.handleSubmit}
                      mode="contained"
                      labelStyle={Styles.nextButtonText}
                      style={Styles.buttonDisableContainer}
                      disabled={true}
                    >
                      Create Account
                    </Button>
                  )}

                  <View style={Styles.bottomView}>
                    <View style={Styles.loginView}>
                      <Text style={Styles.loginTextStyle}>Already have an account? </Text>
                      <TouchableOpacity>
                        <Text style={Styles.loginStyle} onPress={() => logIn()}>
                          Log in
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
      {/* {createCustomerResponse !== null ? (
        <View style={Styles.snackbarContainer}>
          <Snackbar
            visible={true}
            onDismiss={() => console.log('dismiss')}
            action={{
              label: 'Log In ',
              onPress: () => {
                navigation.navigate(ScreenNames.LoginScreen)
              },
            }}
            duration={Snackbar.DURATION_MEDIUM}
          >
            Congratulations, your account has been successfully created.
          </Snackbar>
        </View>
      ) : null} */}
    </SafeAreaView>
  )
}

export default Header
