import React from 'react';
import {View, Text} from 'react-native';
import Styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native-paper';
import {ScreenNames} from '../../navigator/constants';
import {logout, saveUserId} from '../../utils/api';
import RNRestart from 'react-native-restart';
import Call from 'react-native-phone-call';

const Logout: React.FC = (props: any) => {
  const navigation = useNavigation();

  console.log('in call hospital', props.phonenumber);
  const onLogout = async () => {
    const res = await logout();
    if (res.is_success) {
      const saveUser = await saveUserId(0);
      // RNRestart.Restart();
      navigation.navigate(ScreenNames.LoginScreen);
    }
  };

  const onCall = async () => {
    const args = {
      number: props.phonenumber, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    Call(args).catch(console.error);
  };

  return (
    <Text style={{marginTop: 15}}>
      {'   '}
      <MaterialCommunityIcons
        // onPress={() => navigation.navigate(ScreenNames.HomeScreen)}
        onPress={() => onCall()}
        name="phone"
        color="#D3ECF9"
        size={30}
        // style={{backgroundColor: 'red'}}
      />
    </Text>
  );
};

export default Logout;
