import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import {AntDesign} from '@expo/vector-icons';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage} from './../../utils/api';
import axios from 'axios';
import {Button, Snackbar} from 'react-native-paper';
import Styles from './login/styles';
import DocumentPicker from 'react-native-document-picker';

export default function UploadImage(params: any) {
  console.log('params in uploadreport-->', params);

  const userId = params?.userData?.user_id;

  const addImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res?.uri);
      console.log('Type : ' + res?.type);
      console.log('File Name : ' + res?.name);
      console.log('File Size : ' + res[0]?.size);

      //Setting the state to show single file attributes
      {
        res[0]?.size < 100000 && params.setSingleFile(res);
      }
      {
        res[0]?.size > 100000 &&
          alert(
            `Max file size exceeded (100 KB). 
Your file size is` +
              (Math.round((res[0]?.size / 1000) * 100) / 100).toFixed(2) +
              ' KB',
          );
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View>
      <View>
        <Button
          color="#fff"
          onPress={addImage}
          mode="contained"
          labelStyle={Styles.nextButtonText1}
          style={Styles.nextButtonContainer1}>
          {'  '}Select a file to upload{'  '}
        </Button>
        <Text style={Styles.nextButtonText1}>{params.singleFile[0]?.name}</Text>
        {params.singleFile[0]?.size && (
          <Text style={Styles.nextButtonText1}>
            {(
              Math.round((params.singleFile[0]?.size / 1000) * 100) / 100
            ).toFixed(2)}{' '}
            KB
          </Text>
        )}
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    // elevation: 2,
    height: 40,
    width: 100,
    backgroundColor: '#efefef',
    // position: 'relative',
    // borderRadius: 999,
    // overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
