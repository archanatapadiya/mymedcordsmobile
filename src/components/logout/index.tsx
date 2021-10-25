import React from 'react';
import {View} from 'react-native';
import Styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native-paper';
import {ScreenNames} from '../../navigator/constants';
import {logout, saveUserId} from '../../utils/api';
import RNRestart from 'react-native-restart';

const Logout: React.FC = () => {
  const navigation = useNavigation();

  const onLogout = async () => {
    const res = await logout();
    if (res?.is_success) {
      const saveUser = await saveUserId(0);
      // RNRestart.Restart();
      navigation.navigate(ScreenNames.LoginScreen);
    }
  };



  return (
    <View style={Styles.container}>
   
      <MaterialCommunityIcons
        // onPress={() => navigation.navigate(ScreenNames.HomeScreen)}
        onPress={() => onLogout()}
        name="logout"
        color={Colors.white}
        size={30}
      />
    </View>
  );
};

export default Logout;
