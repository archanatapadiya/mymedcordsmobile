import React from 'react'
import { View } from 'react-native'
import Styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'react-native-paper'
import { ScreenNames } from '../../navigator/constants'

const Home: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={Styles.container}>
      <MaterialCommunityIcons
        onPress={() => navigation.navigate(ScreenNames.HomeScreen)}
        name="home"
        color={Colors.white}
        size={30}
      />
    </View>
  )
}

export default Home
