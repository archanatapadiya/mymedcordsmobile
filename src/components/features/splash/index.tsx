import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import {navigate} from '../../../navigator/NavigationService';
import {ScreenNames} from '../../../navigator/constants';

var bg = require('../../../assets/logo/splashScreen.jpeg');
export default class Splash extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate(ScreenNames.LoginScreen);
    }, 3000);
  }
  render() {
    return (
      <ImageBackground source={bg} style={{height: '100%', width: '100%'}} />
    );
  }
}
