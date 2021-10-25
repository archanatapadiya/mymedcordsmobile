import React, {useState} from 'react';
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
  FlatList,
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
import CollapsibleView from '@eliav2/react-native-collapsible-view';

const Doctors = [
  {
    id: '1',
    name: 'DR. ACHYUT JOSHI',
    title: 'CONSULTING PHYSICIAN',
    education: 'MBBS, MD (Med)',
  },
  {
    id: '2',
    name: 'DR. SUSHIL DESHMUKH',
    title: 'GENERAL SURGEON',
    education: 'MBBS, MS (Gen. Surgery), FAMS',
  },
  {
    id: '3',
    name: 'DR. ABHIJIT JOSHI',
    title: 'ORTHOPAEDIC SURGEON',
    education: 'MBBS, D-ORTHO',
  },
  {
    id: '4',
    name: 'DR. AJIT GURJAR',
    title: 'GENERAL SURGEON',
    education: 'MBBS, MS(Gen.Surg.)',
  },
  {
    id: '5',
    name: 'DR. ANUP BHOYAR',
    title: 'CHEST PHYSICIAN',
    education: 'MBBS, MD( Pulmonary Medicine)',
  },
  {
    id: '6',
    name: 'DR. SWAPNIL DESHMUKH',
    title: 'PSYCHIATRIST',
    education: 'MBBS, MD(PSYCHIATRY)',
  },
  {
    id: '7',
    name: 'DR. AJINKYA KELKAR',
    title: 'ENT SURGEON',
    education: 'MBBS, MS (ENT), DNB, MRCS(UK)',
  },
  {
    id: '8',
    name: 'DR. TANMAY KULKARNI',
    title: 'PLASTIC SURGEON',
    education: 'MBBS, DNB (Plastic Surgery)',
  },
  {
    id: '9',
    name: 'DR. SUSHIL DESHMUKH',
    title: 'PSYCHIATRIST',
    education: 'MBBS, MD (Psychiatry)',
  },
  {
    id: '10',
    name: 'DR. SMITA SAKOLKAR',
    title: 'GYNAECOLOGIST',
    education: 'MBBS, DNB (OB/GYN)',
  },
  {
    id: '11',
    name: 'ADITI DHARMADHIKARI',
    title: 'COUNSELLOR',
    education: 'MA Clinical Psychology',
  },
  {
    id: '12',
    name: 'DR.ANUSHREE BHONDE',
    title: 'PHYSIOTHERAPY',
    education: 'BPTh',
  },
];

const HospiceCare = [
  {
    id: '1',
    title: 'COMPLETE CARE 24X7',
  },
  {
    id: '2',
    title: 'MEDICAL SUPPORT QUALIFIED DOCTORS',
  },
  {
    id: '3',
    title: 'PERSONAL CARETAKER',
  },
  {
    id: '4',
    title: 'NURSING ASSISTANCE WELL TRAINED NURSES',
  },
  {
    id: '5',
    title: 'PHYSIOTHERAPY',
  },
  {
    id: '6',
    title: 'EMOTIONAL SUPPORT',
  },
  {
    id: '7',
    title: 'COUNSELLING SERVICES',
  },
  {
    id: '8',
    title: 'EXPERIENCED CONSULTANTS',
  },
  {
    id: '9',
    title: 'COMFORTABLE STAY SHARING/PRIVATE OPTIONS',
  },
  {
    id: '10',
    title: 'IN HOUSE DIAGNOSTICS BLOOD TESTS, XRAY, ECG, USG',
  },
  {
    id: '11',
    title: 'AIRBED, OXYGEN, RT FEEDS',
  },
  {
    id: '12',
    title: 'CUSTOMIZED NUTRITION',
  },
];

const CorporateHealth = [
  {
    id: '1',
    title: 'AWARENESS',
    description:
      'Organising health lectures at corporates on relevant medical topics to build awareness amongst the company employees.',
  },
  {
    id: '2',
    title: 'HEALTH CHECK',
    description:
      'Facilitate a health check for employees at their work place to make it convenient for them to take care of their health without visiting a health center.',
  },
  {
    id: '3',
    title: 'PROGRAMS',
    description:
      'Special programs like Laughter Yoga, Genetic Kundli, Yoga, Zumba, Music Therapy, Dance Therapy can be organised at the corporate location to benefit.',
  },
  {
    id: '4',
    title: 'STAFFING',
    description:
      'We provide qualified doctors and nurses to be stationed at the corporate to attend to the needs of the corporate employees who do not have the time to visit a health center.',
  },
];

const Item = ({title, name, education}: any) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{education}</Text>
  </View>
);

const ItemHospiceCare = ({title}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ItemCorporateHealth = ({title, description}: any) => (
  <View style={styles.item}>
    <Text style={styles.name}>{title}</Text>
    <Text style={styles.title}>{description}</Text>
  </View>
);

const Updates = () => {
  const renderItem = ({item}: any) => (
    <Item title={item.title} name={item.name} education={item.education} />
  );

  const renderItemHospiceCare = ({item}: any) => (
    <ItemHospiceCare title={item.title} />
  );

  const renderItemCorporateHealth = ({item}: any) => (
    <ItemCorporateHealth title={item.title} description={item.description} />
  );

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HospitalHeader />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>INFORMATION</Text>
        </View>

        <CollapsibleView title="About">
          <Text>
            Sathe Hospital has always felt like home to many in the neighbouring
            community owing to the excellent treatment given by its consultants,
            first by Dr. AG Sathe, the pioneer of Sathe Hospital and then by Dr.
            Ajit Gurjar and Dr. AC Joshi, who have nurtured the hospital for
            several decades.
            {'\n'}
            {'\n'}The warm treatment rendered here by the staff is unparalleled
            and the greatest sense of achievement for the hospital is the faith
            its patients have on the medical treatment given here.
          </Text>
        </CollapsibleView>

        <CollapsibleView title="Doctors">
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={Doctors}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </CollapsibleView>

        <CollapsibleView title="Services">
          <Text>
            Sathe Hospital has always been blessed with some of the best doctors
            and surgeons in the field. Experience, In Depth Subject Knowledge,
            Empathy and Ethics are some of the hallmarks of the practicing
            consultants who provide their services to the hospital.
            {'\n'} {'\n'}Sathe Hospital is now equipped with state of the art
            diagnostics that helps the doctors make the right decision and
            quickly. This great improves patient care. The Digital X-Ray
            machine, a universal sonography machine, 2D Echo, Stress Test and a
            well equipped pathology lab make up the new diagnostics department
            at Sathe Hospital.
          </Text>
        </CollapsibleView>

        <CollapsibleView title="Hospice Care">
          <Text>
            Hospice care is a type of care and philosophy of care that focuses
            on the palliation of a chronically ill, terminally ill or seriously
            ill patient's pain and symptoms, and attending to their emotional
            and spiritual needs.
          </Text>
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={HospiceCare}
              renderItem={renderItemHospiceCare}
              keyExtractor={itemHospiceCare => itemHospiceCare.id}
            />
          </SafeAreaView>
        </CollapsibleView>

        <CollapsibleView title="Corporate Health">
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={CorporateHealth}
              renderItem={renderItemCorporateHealth}
              keyExtractor={itemCorporateHealth => itemCorporateHealth.id}
            />
          </SafeAreaView>
        </CollapsibleView>
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
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {textAlign: 'center', textAlignVertical: 'center', fontSize: 14},
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#dcdcdc',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Updates;
