import React from 'react';
//  import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from '../header';
import HospitalHeader from '../hospitalHeader';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';

const History = ({route}) => {
  const {hospName, logo, hospitalId, phoneNumber} = route.params;

  console.log('phonenumber in history', phoneNumber);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            onPress={() => navigate(ScreenNames.HospitalSelection)}
            name="keyboard-backspace"
            color={Colors.black}
            size={30}
            style={{marginTop: 18, marginLeft: 10}}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>HISTORY</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            padding: '2%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: logo}}
            style={styles.logoStyle}
            resizeMode="contain"
          />
          <Text style={{margin: 10, fontSize: 30, fontWeight: 'bold'}}>
            {hospName}
          </Text>

          <CallHospital phonenumber={phoneNumber} />
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View style={styles.buttonView}>
            <Button
              title="REPORTS"
              onPress={() =>
                navigate(ScreenNames.ReportsScreen, {
                  type: 'history',
                  hospName: hospName,
                  logo: logo,
                  hospitalId: hospitalId,
                  phoneNumber: phoneNumber,
                })
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="UPDATES"
              onPress={() =>
                navigate(ScreenNames.UpdatesScreen, {
                  type: 'history',
                  hospName: hospName,
                  logo: logo,
                  hospitalId: hospitalId,
                  phoneNumber: phoneNumber,
                })
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="BILLING"
              onPress={() =>
                navigate(ScreenNames.BillingScreen, {
                  type: 'history',
                  hospName: hospName,
                  logo: logo,
                  hospitalId: hospitalId,
                  phoneNumber: phoneNumber,
                })
              }
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              title="INFORMATION"
              onPress={() => navigate(ScreenNames.InfoScreen)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    padding: 10,
    width: 150,
  },
  container: {
    alignSelf: 'stretch',
    marginStart: 10,
  },
  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,

    borderRadius: 10,
    width: 60,
    height: 60,
  },
});

export default History;
