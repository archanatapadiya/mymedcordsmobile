import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import {AntDesign} from '@expo/vector-icons';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage} from './../../utils/api';
import axios from 'axios';

export default function UploadImage(params: any) {
  console.log('params in upload', params);
  const [image, setImage] = useState(null);
  const userDetails = params?.userData;
  const userId = params?.userData?.user_id;
  const addImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image1 => {
      setImage(image1);
      let params = {
        image1,
        user_id: userId,
        userData: userDetails,
      };
      console.log('image1 in upload image', image1, image);

      console.log('params in upload image', params);
      const res = await uploadImage(params);
      console.log('res111222', res);
    });

    //   const res = await uploadImage(params);
    console.log('image imageimage', image);
    console.log('res on upload image');
  };

  const profilePicPath = image ? image?.path : params?.userData?.profile_pic;

  return (
    <View style={imageUploaderStyles.container}>
      {(image || params?.userData?.profile_pic) && (
        <Image
          source={{uri: profilePicPath}}
          style={{width: 100, height: 100}}
        />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}>
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
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
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
