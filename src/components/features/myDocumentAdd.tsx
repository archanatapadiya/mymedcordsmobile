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
import {Button, Snackbar} from 'react-native-paper';

import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {
  getUserReports,
  getUserId,
  addUserReports,
  checkSpace,
} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLogo from '../pageLogo';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Styles from './login/styles';
import UploadReport from './uploadReport';
import {Alert} from 'react-native';

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
  // const {reportCount} = route?.params;

  const image = require('./../../assets/logo/background.jpeg');

  const input = useInput(new Date());
  const input2 = useInput(new Date());

  const [userReportList, setUserReportList] = useState<ReportData[]>();
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  let reportsData: any = [];

  const [singleFile, setSingleFile] = useState('');
  const [reportCount, setReportCount] = useState(0);

  console.log('valuesim handle submit  singleFile', singleFile);

  const checkSpaceUtil = async (loggedInUserId: any) => {
    const space = await checkSpace(loggedInUserId);
    setReportCount(space?.data?.data);
  };

  const getUserDetails = async () => {
    const userId = await getUserId();
    setLoggedInUserId(userId);
    return userId;
  };

  const handleSubmitUpload = async (values: any) => {
    console.log('valuesim handle submit ', values);
    let fileValue = 'my';
    let searchedUserId = loggedInUserId;
    let loggedInHospType = 0;
    let loggedInUserId1 = null;
    let is_user_upload = true;

    let singleFileToPass = singleFile[0] ? singleFile[0] : singleFile;

    const reportupload = await addUserReports(
      values,
      input2,
      loggedInUserId1,
      fileValue,
      searchedUserId,
      loggedInHospType,
      is_user_upload,
      singleFileToPass,
    );

    if (reportupload?.ok) {
      navigate(ScreenNames.MyDocumentViewScreen);
    }
    return reportupload;
  };

  useEffect(() => {
    const userId = getUserDetails();
  }, []);

  useEffect(() => {
    const space1 = checkSpaceUtil(loggedInUserId);
  }, [loggedInUserId]);

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D3ECF9'}}>
            REPORTS: {reportCount} / 50
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.MyDocumentViewScreen)}
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
            ADD DOCUMENTS
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
                description: '',
                health_center: '',
                doctor: '',
                file_name: '',
              }}
              onSubmit={values => handleSubmitUpload(values)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Report Date: {input2.date.toLocaleDateString()}
                  </Text>

                  <Button
                    color="#fff"
                    onPress={input2.showDatepicker}
                    mode="contained"
                    labelStyle={Styles.nextButtonText2}
                    style={Styles.nextButtonContainer2}>
                    {'  '}Select report date{'  '}
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
                    Health Center
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('health_center')}
                    onBlur={handleBlur('health_center')}
                    value={values.health_center}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Type Of Document / Modality
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('file_name')}
                    onBlur={handleBlur('file_name')}
                    value={values.file_name}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#D3ECF9',
                      marginTop: 10,
                    }}>
                    Description
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
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

                  {/* <Button  onPress={handleSubmit} title="Submit" /> */}
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
