import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface Props {
    updateImage: (uri: string) => void;
  }

const ProfilePictureUploadScreen: React.FC<Props> = ({updateImage}) => {
  
  const pickImage = async () => {
    // Ask for permission to access photos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        console.log('I GOT AN IMAGE');
        

    console.log("Image size (bytes):", result.assets[0].fileSize);
   

      updateImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Profile Picture</Text>
      
      <Button title="Pick an Image" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9B9ED850',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default ProfilePictureUploadScreen;
