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
  FlatList,
} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {navigate, push} from '../../navigator/NavigationService';
import {ScreenNames} from '../../navigator/constants';
import {getUserReports, getUserId, getOffers} from '../../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallHospital from '../callHosp';
import {DataTable} from 'react-native-paper';
import PageLogo from '../pageLogo';
import {Card} from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';
import ParsedText from 'react-native-parsed-text';

const Reports = () => {
  const image = require('./../../assets/logo/background.jpeg');

  const [userHealthTip, setUserHealthTip] = useState([]);

  const [showMore, setShowMore] = useState(false);

  let reportsData: any = [];

  useEffect(() => {
    const userReportsData = async () => {
      const userReports = await getOffers();
      reportsData = userReports?.data;

      setUserHealthTip(reportsData);
      return reportsData;
    };

    const userReports = userReportsData();
  }, []);

  const handleUrlPress = (url, matchIndex /*: number*/) => {
    Linking.openURL(url);
  };

  const Item = ({title, message, startDate, endDate}) => (
    <View style={styles.item}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View>
        <ParsedText
          style={styles.text}
          parse={[{type: 'url', style: styles.url, onPress: handleUrlPress}]}
          childrenProps={{allowFontScaling: false}}>
          {message}
        </ParsedText>
      </View>

      <Text>
        {' '}
        Validity: {startDate} {'  --  '}
        {endDate}{' '}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      message={item.description}
      startDate={item.start_date}
      endDate={item.end_date}
    />
  );

  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: null, height: null}}>
      <PageLogo />

      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          onPress={() => navigate(ScreenNames.MoreScreen)}
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
            OFFERS
          </Text>
        </View>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={userHealthTip}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  user: {
    // flexDirection: 'row',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
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
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
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
