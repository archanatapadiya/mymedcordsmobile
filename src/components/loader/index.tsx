import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Styles from './styles'

const Loader: React.FC = () => (
  <View style={Styles.container}>
    <ActivityIndicator size={30} />
  </View>
)

export default Loader
