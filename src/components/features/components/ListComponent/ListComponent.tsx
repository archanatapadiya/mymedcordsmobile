import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import {ScreenNames} from '../../../../navigator/constants';
import {navigate, push} from '../../../../navigator/NavigationService';


import Styles from './style';

const ListComponent = (props: any) => {
  const { item } = props;
  console.log('delivery list===========', item);
 

  return (
    <TouchableWithoutFeedback
    style={{backgroundColor:'#f2f2f2',}}
      onPress={() =>
        navigate(ScreenNames.Current)
      }>
      <View style={Styles.wrapper}>
        <View style={Styles.mainContainer}>
          <View style={Styles.topContainer}>
            <View style={Styles.topLeftContainer}>
              <View style={Styles.topLeftUpperContainer}>
                <Text style={Styles.topLefttUpperText}>{item.event_time}</Text>
              </View>
              <View style={Styles.topLeftBottomContainer}>
                <Text style={{...Styles.commonTextStyle, marginLeft: 7,}}>{item.file_name}</Text>
              </View>
            </View>
         
          </View>

     
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListComponent;

{
  /* <View style={Styles.bottomRightContainer}>
  <Entypo name="clock" size={20} />
  <Text style={Styles.commonTextStyle}>{dayjs(item.pickup_datetime).format('hh:mm A')}</Text>
</View>; */
}
