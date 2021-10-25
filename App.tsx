/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigator from './src/navigator';
import {SafeAreaView, Text} from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
    
      <Navigator />
    </SafeAreaView>
  );
};

export default App;
