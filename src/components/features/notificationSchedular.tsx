import React, {useState, useEffect} from 'react';
// import DatePicker from 'react-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Text, View, FlatList} from 'react-native';
import {
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  Flex,
  RadioButton,
} from 'react-native-paper';
import Styles from './login/styles';

export default function NotificationScheduler(params: any) {
  let products = params?.products;

  const handleChange = (id: any) => {
    let temp = products.map(product => {
      if (id == product.id) {
        return {...product, isChecked: !product.isChecked};
      }
      return product;
    });

    params?.setProducts(temp);
  };

  return (
    <View>
      <View>
        <RadioButton.Group
          onValueChange={value => params?.setFileValue(value)}
          value={params?.fileValue}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#D3ECF9',
                }}>
                Select Days
              </Text>
              {/* <RadioButton value="daily" /> */}
            </View>
            {params?.fileValue == 'daily' && (
              <View style={{flexDirection: 'row', flex: 1}}>
                {products?.map((item, i) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                      <Checkbox
                        status={item.isChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          handleChange(item.id);
                        }}
                      />

                      <Text style={{marginLeft: 8}}>{item.txt}</Text>
                    </View>
                  );
                })}
              </View>
            )}

            {/* <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#D3ECF9',
                }}>
                Once a week on...
              </Text>
              <RadioButton value="weekly" />
            </View> */}

            {/* {params?.fileValue == 'weekly' && (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                {products?.map((item, i) => {
                  return (
                    <RadioButton.Group
                      onValueChange={value => params?.setWeekDay(value)}
                      value={params?.weekDay}>
                      <View>
                        <View>
                          <RadioButton value={item.id} />
                          <Text
                            style={{
                              marginTop: 5,
                              marginLeft: 10,
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: '#D3ECF9',
                            }}>
                            {item.txt}
                          </Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  );
                })}
              </View>
            )} */}
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
}
