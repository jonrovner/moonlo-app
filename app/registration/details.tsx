import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
   user:any;
   gender:string;
   yearOfBirth:string;
   aboutMe:string;
   setAboutMe:(aboutMe:string)=>void;
   setGender:(gender:string)=>void;
   setYearOfBirth:(yearOfBirth:string)=>void;
   onSubmit:()=>void;
  }

const Details: React.FC<Props>  = (
    
    {user, 
    gender, 
    setGender, 
    onSubmit, 
    yearOfBirth, 
    setYearOfBirth, 
    aboutMe, 
    setAboutMe}) => {


  return (
   <KeyboardAvoidingView>
             <ScrollView contentContainerStyle={styles.scrollContainer}>
   
           <View style={styles.formContainer}>
             <View style={styles.inputGroup}>
               <Text style={styles.inputLabel}>Name</Text>
               <TextInput style={styles.input} value={user?.name} editable={false} />
             </View>
   
             <View style={styles.inputGroup}>
               <Text style={styles.inputLabel}>City</Text>
               <TextInput style={styles.input} value={user?.city} editable={false} />
             </View>
   
             <View style={styles.inputGroup}>
               <Text style={styles.inputLabel}>Year of Birth</Text>
               <TextInput style={styles.input} placeholder="Enter your year of birth" value={yearOfBirth} onChangeText={setYearOfBirth} keyboardType="numeric" />
             </View>
   
             <View style={styles.inputGroup}>
               <Text style={styles.inputLabel}>Gender</Text>
               <View style={styles.radioGroup}>
                 <TouchableOpacity style={styles.radioButton} onPress={() => setGender('Male')}>
                   <Text style={gender === 'Male' ? styles.radioSelected : styles.radioText}>Male</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.radioButton} onPress={() => setGender('Female')}>
                   <Text style={gender === 'Female' ? styles.radioSelected : styles.radioText}>Female</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.radioButton} onPress={() => setGender('Other')}>
                   <Text style={gender === 'Other' ? styles.radioSelected : styles.radioText}>Other</Text>
                 </TouchableOpacity>
               </View>
             </View>
   
             <View style={styles.inputGroup}>
               <Text style={styles.inputLabel}>About Me</Text>
               <TextInput style={[styles.input, styles.textarea]} placeholder="Write a short description about yourself" value={aboutMe} onChangeText={setAboutMe} multiline />
             </View>
   
           </View>
             <TouchableOpacity style={styles.button} onPress={onSubmit}>
               <Text style={styles.buttonText}>Next</Text>
             </TouchableOpacity>
           </ScrollView>
           </KeyboardAvoidingView>
  )
}

export default Details

const styles = StyleSheet.create({
    container: { backgroundColor: 'black', },
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
    picture:{width: 200, height: 200, borderRadius: 100, alignSelf: 'center', marginTop: 20,}
    
  });