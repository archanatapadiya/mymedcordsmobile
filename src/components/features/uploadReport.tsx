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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native-paper';

export default function UploadImage(params: any) {
  console.log('params in uploadreport-->', params);

  const userId = params?.userData?.user_id;

  const captureImage = async () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 800,
      cropping: true,
    }).then(image => {
      params.setSingleFile(image);
      console.log('image captured', image);
    });
  };

  const addImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log('res111 : ' + JSON.stringify(res));
      console.log('URI : ' + res?.uri);
      console.log('Type : ' + res?.type);
      console.log('File Name : ' + res?.name);
      console.log('File Size : ' + res[0]?.size);

      //Setting the state to show single file attributes
      {
        res[0]?.size < 1000000 && params.setSingleFile(res);
      }
      {
        res[0]?.size > 1000000 &&
          alert(
            `Max file size exceeded (1 MB). 
Your file size is` +
              (Math.round((res[0]?.size / 1000000) * 100) / 100).toFixed(2) +
              ' MB',
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            onPress={captureImage}
            name="camera"
            color={Colors.white}
            size={40}
            style={{marginLeft: 10, marginTop: 20, marginRight: 20}}
          />
          <Button
            color="#fff"
            onPress={addImage}
            mode="contained"
            labelStyle={Styles.nextButtonText1}
            style={Styles.nextButtonContainer1}>
            {'  '}Select a file to upload{'  '}
          </Button>
        </View>

        <Text style={Styles.nextButtonText1}>
          {params.singleFile[0]?.name
            ? params.singleFile[0]?.name
            : params.singleFile.mime}
        </Text>
        {params.singleFile[0]?.size && (
          <Text style={Styles.nextButtonText1}>
            {(
              Math.round((params.singleFile[0]?.size / 1000000) * 100) / 100
            ).toFixed(2)}{' '}
            MB
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
