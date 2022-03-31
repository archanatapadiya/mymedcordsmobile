import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Button, Snackbar, RadioButton} from 'react-native-paper';

import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {
  getUserId,
  addUserUpdates,
  getHospitalType,
  getSearchedUserId,
} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLogo from '../pageLogo';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Styles from './login/styles';
import UploadReport from './uploadReport';

interface ReportData {
  descreption: string;
  lab_id__name: string;
  file_name: string;
  file_url: string;
  event_time: string;
}

function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log('currentDate in update', currentDate);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  return {
    date,
    showDatepicker,
    showTimepicker,
    show,
    mode,
    onChange,
  };
}

const Reports = ({route}) => {
  const image = require('./../../assets/logo/background.jpeg');

  const input2 = useInput(new Date());

  const [fileValue, setFileValue] = React.useState('opd');

  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [loggedInHospType, setLoggedInHospType] = useState(0);
  const [searchedUserId, setSearchedUserId] = useState(0);

  const getUserDetails = async () => {
    const userId = await getUserId();
    const hospType = await getHospitalType();
    const searched_UserId = await getSearchedUserId();

    setLoggedInUserId(userId);
    setLoggedInHospType(hospType);
    setSearchedUserId(searched_UserId);
    return userId;
  };

  const handleSubmitUpload = async (values: any) => {
    const reportupload = await addUserUpdates(
      values,
      input2,
      loggedInUserId,
      fileValue,
      searchedUserId,
      loggedInHospType,
    );
    if (reportupload?.ok) {
      navigate(ScreenNames.PatientDetailsScreen);
    }
    return reportupload;
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />

      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.PatientDetailsScreen)}
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
            ADD UPDATES
          </Text>
        </View>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              margin: 20,
            }}>
            <Formik
              initialValues={{
                health_update: '',
                doctor: '',
              }}
              onSubmit={values => handleSubmitUpload(values)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                  {loggedInHospType == 3 && (
                    <View
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#D3ECF9',
                        marginTop: 10,
                      }}>
                      <RadioButton.Group
                        onValueChange={value => setFileValue(value)}
                        value={fileValue}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#D3ECF9',
                              }}>
                              OPD
                            </Text>
                            <RadioButton value="opd" />
                          </View>
                          <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#D3ECF9',
                              }}>
                              IPD
                            </Text>
                            <RadioButton value="ipd" />
                          </View>
                        </View>
                      </RadioButton.Group>
                    </View>
                  )}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Health Update
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('health_update')}
                    onBlur={handleBlur('health_update')}
                    value={values.health_update}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Doctor
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('doctor')}
                    onBlur={handleBlur('doctor')}
                    value={values.doctor}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Date/ Time: {input2.date.toLocaleString()}
                  </Text>

                  <Button
                    color="#fff"
                    onPress={input2.showDatepicker}
                    mode="contained"
                    labelStyle={Styles.nextButtonText2}
                    style={Styles.nextButtonContainer2}>
                    {'  '}Select test date{'  '}
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

                  <Button
                    color="#fff"
                    onPress={input2.showTimepicker}
                    mode="contained"
                    labelStyle={Styles.nextButtonText2}
                    style={Styles.nextButtonContainer2}>
                    {'  '}Select test time{'  '}
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

                  <Button
                    color="#fff"
                    onPress={handleSubmit}
                    mode="contained"
                    labelStyle={Styles.nextButtonText1}
                    style={Styles.nextButtonContainer1}>
                    {'  '}Submit{'  '}
                  </Button>
                </View>
              )}
            </Formik>
          </View>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D3ECF9',
    backgroundColor: 'white',
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
    padding: 10,
    width: 150,
  },
  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,

    borderRadius: 10,
    width: 60,
    height: 60,
  },
  head: {height: 40, backgroundColor: '#f1f8ff', fontSize: 16},
  text: {textAlign: 'center', textAlignVertical: 'center', fontSize: 14},
});

export default Reports;
