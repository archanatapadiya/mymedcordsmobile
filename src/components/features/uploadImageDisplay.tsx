import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage} from './../../utils/api';
import axios from 'axios';

export default function UploadImage(params: any) {
  console.log('params in upload display', params);
  const [image, setImage] = useState(null);
  const userDetails = params?.userData;
  const userId = params?.userData?.user_id;

  console.log('params in upload display', params?.userData1?.profile_pic);

  return (
    <View style={imageUploaderStyles.container}>
      {params?.userData1?.profile_pic && (
        <Image
          source={{uri: params?.userData1?.profile_pic}}
          style={{width: 100, height: 100}}
        />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          // onPress={addImage}
          style={imageUploaderStyles.uploadBtn}>
          {/* <Text>{image ? 'Edit' : 'Upload'} Image</Text> */}
          {/* <AntDesign name="camera" size={20} color="black" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 100,
    width: 100,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    // height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
