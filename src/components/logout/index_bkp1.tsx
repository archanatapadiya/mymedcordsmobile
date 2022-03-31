import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native-paper';
import {ScreenNames} from '../../navigator/constants';
import {logout, saveUserId} from '../../utils/api';
import {getUserName, getUserId, fetchUserDetails} from '../../utils/api';
// import Drawer from 'react-native-drawer';

import {createDrawerNavigator} from '@react-navigation/drawer';

const Logout: React.FC = () => {
  const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
  };

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={ScreenNames.MoreScreen} />
        <Drawer.Screen
          name="Notifications"
          component={ScreenNames.MoreScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Logout;
