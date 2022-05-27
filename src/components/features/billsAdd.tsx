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
  addUserBills,
  getHospitalType,
  getSearchedUserId,
} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLogo from '../pageLogo';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Styles from './login/styles';
import UploadReport from './uploadReportBills';

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

const Reports = ({route}) => {
  const image = require('./../../assets/logo/background.jpeg');

  const input2 = useInput(new Date());

  const [fileValue, setFileValue] = React.useState('opd');

  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [loggedInHospType, setLoggedInHospType] = useState(0);
  const [searchedUserId, setSearchedUserId] = useState(0);

  let reportsData: any = [];

  const [singleFile, setSingleFile] = useState('');

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
    let singleFileToPass = singleFile[0] ? singleFile[0] : singleFile;

    const reportupload = await addUserBills(
      values,
      input2,
      loggedInUserId,
      fileValue,
      searchedUserId,
      loggedInHospType,
      singleFileToPass,
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
            ADD BILLS
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
                bill_file_name: '',
                remark: '',
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
                    Bill File Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('bill_file_name')}
                    onBlur={handleBlur('bill_file_name')}
                    value={values.bill_file_name}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Remark
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('remark')}
                    onBlur={handleBlur('remark')}
                    value={values.remark}
                  />

                  <UploadReport
                    singleFile={singleFile}
                    setSingleFile={setSingleFile}
                  />

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
