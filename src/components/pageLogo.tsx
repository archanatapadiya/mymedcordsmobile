import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {navigate, push} from '../navigator/NavigationService';
import {ScreenNames} from '../navigator/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PageLogo: React.FC = () => {
  const Logo = require('../assets/logo/MyMedCordsTransparent.png');

  return (
    <View>
      <Image source={Logo} style={styles.logoStyle} resizeMode="contain" />
      <Text style={styles.logoText}>MYMEDCORDS</Text>
      <Text style={styles.logoSubText}>My Medical Records</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    borderWidth: 1,
    padding: '2%',
    borderRadius: 10,
    width: 90,
    height: 70,
    marginTop: 20,
    marginRight: 20,
  },

  logoText: {
    alignSelf: 'flex-end',
    paddingTop: '2%',
    marginRight: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D3ECF9',
  },
  logoSubText: {
    alignSelf: 'flex-end',
    // padding: '2%',
    marginRight: 20,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D3ECF9',
  },
});

export default PageLogo;
