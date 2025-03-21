import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface Props {
    updateImage: (uri: string) => void;
    onSubmit:()=>void
  }

const ProfilePictureUploadScreen: React.FC<Props> = ({updateImage, onSubmit}) => {

  const [picture, setPicture] = useState("")

  async function encode (uri:string) {
      const base64Image = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64,});
      updateImage(base64Image)
  }  
  useEffect(()=>{ 
      encode(picture)
  }, [picture]);
  
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
        
      setPicture(result.assets[0].uri);

    }
  };

  return (
    <>
    <View style={styles.formContainer}></View>
     <Text>Choose photo</Text>
    <View style={styles.container}>
      
      {picture && <Image source={{ uri: picture }} style={styles.image} />}
     
    </View>
    <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Select Image</Text>
              </TouchableOpacity>
              
     <TouchableOpacity style={styles.button} onPress={onSubmit}>
                 <Text style={styles.buttonText}>CREATE PROFILE</Text>
               </TouchableOpacity>         
              </>
  );
};

const styles = StyleSheet.create({
  container: {
    height:300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9B9ED850',
  },
  scrollContainer:{flexGrow:1, display:'flex'},
  scrollViewContainer: { padding: 20, alignItems: 'center' },
  formContainer: { padding:20, width: '100%', display:'flex', justifyContent:'space-between'},
  formTitle:{marginBlockStart:20,alignSelf:'center', textAlign:'center', fontWeight:'bold', marginBottom:15},
  inputGroup: { marginBottom: 15 },
  inputLabel: { fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#A7A3CA', padding: 10, borderRadius: 5 },
  textarea: { height: 100, textAlignVertical: 'top' },
  button: { margin: 20, backgroundColor: '#161954', padding: 15, borderRadius: 10, alignItems: 'center'},
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  radioButton: { padding: 10 },
  radioText: { color: '#333' },
  radioSelected: { color: '#8a9ae0', fontWeight: 'bold' },
  errorText:{color:'red'},
  loadingText:{color:'green'},
  screenControls:{display:'flex', flexDirection:'row'},
  summaryContainer:{display:'flex'},
  input_image:{width:100, height:100, alignSelf:'center'},
  asc_image:{width:200, height:100, alignSelf:'center'},
  dealbraker:{width:'100%', display:'flex', flexDirection:'row', padding:10, backgroundColor:'#A7A3CA30', marginBlock:15, justifyContent:'space-between', alignItems:'center' },
  picker:{padding:10},
  picker_item:{padding:10, backgroundColor:"red"},
  background_image:{width:'100%', height:'100%', },
  age_input:{ width:'20%', backgroundColor: '#A7A3CA', height:50},
  summaryTitle:{fontSize:40, textAlign:'center',margin:'5%'},
  summaryText:{margin:10, padding:10, backgroundColor:'#A7A3CA', borderRadius:5},
  nav_container:{padding: 20, display:'flex', flexDirection:'row', gap:'60', marginBlockStart:20, alignSelf:'center'},
  nav:{height:8, flex:1, backgroundColor:'#A7A3CA', borderRadius:4},
  picture:{width: 200, height: 200, borderRadius: 100, alignSelf: 'center', marginTop: 20,},
  
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default ProfilePictureUploadScreen;
