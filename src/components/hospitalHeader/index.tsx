import React from 'react'
import { View, Image, Text } from 'react-native'
import Styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Colors } from 'react-native-paper'

const Burger: React.FC = () => {
  const navigation = useNavigation()

  const Logo = require('../../assets/logo/satheLogo.jpg'); 

  return (
    <View style={{flex:1, flexDirection: 'row',  marginTop: 10, marginBottom: 10,  padding: '2%', justifyContent: 'center', alignItems: 'center'}}>
    <Image
        source={ Logo }
          style={Styles.logoStyle}
          resizeMode="contain"
        />
        <Text style={{margin: 10, fontSize: 30, fontWeight: 'bold'}}>
          Sathe Hospital
        </Text>
        </View>
  )
}

export default Burger
