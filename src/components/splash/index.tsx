import React from 'react'
import { View } from 'react-native'
import Loader from '../loader'
import Styles from './styles'

const Splash: React.FC = () => (
  <View style={Styles.container}>
    <Loader />
  </View>
)

export default Splash
