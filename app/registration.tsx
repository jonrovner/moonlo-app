import { ScrollView, KeyboardAvoidingView, Switch, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Selector from './components/selector';
import { fetchMovies, fetchBooks, fetchMusic } from './utils.js';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import ProfilePictureUploadScreen from './components/pickImage'
import * as FileSystem from 'expo-file-system';

const Registration = () => {
 
  //auth0
  const { authorize, user, error, getCredentials, isLoading } = useAuth0();
  console.log("user: ", user);
  
  
  async function checkSession() {
    if (!user){
      try {
        await authorize();
        await getCredentials();
      } catch (e) {
        console.log('Authentication error:', e);
      }
    }
  }

  useEffect(()=>{
    checkSession()
  }, [])


  //non-auth0 profile attributes
  const [movies, setMovies] = useState<string[]>([]);
  const [books, setBooks] = useState<string[]>([]);
  const [music, setMusic] = useState<string[]>([]);
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [gender, setGender] = useState('');
  const [sun, setSun] = useState("")
  const [moon, setMoon] = useState("")
  const [asc, setAsc] = useState("")
  const [picture, setPicture] = useState<string>("")
  const [encodedImage, setEncodedImage] = useState<string>()

  //picture encoding

  useEffect(()=>{console.log("encoded: ", encodedImage?.substring(0,20));
  }, [encodedImage])

  async function encode (uri:string) {
    const base64Image = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,});
   
    setEncodedImage(base64Image)
  }

  useEffect(()=>{
    
    encode(picture)

  }, [picture]);


  //errors from input validations
  const [errorMessage, setErrorMsg] = useState<string[]>([])

  //screen navigation
  const [screen, setScreen] = useState(0);

  const ScreenNav = ({ screen }: { screen: number }) => {
    return(
      <View style={styles.nav_container}>      
        <View style={[styles.nav, {backgroundColor: '#161954'}]}></View>
        <View style={screen > 0 ? [styles.nav, {backgroundColor: '#161954'}] :styles.nav}></View>
        <View style={screen > 1 ? [styles.nav, {backgroundColor: '#161954'}] :styles.nav}></View>
        <View style={screen > 2 ? [styles.nav, {backgroundColor: '#161954'}] :styles.nav}></View>
      </View>
    )
  }

  //input validations

  const validateScreen0 = () => {
    const errors = []; 
  
    const year = parseInt(yearOfBirth);
  
    if (isNaN(year) || year < 1910 || year > 2007 || yearOfBirth === "") {
      errors.push("You need a valid year");
    }
    
    if (!(gender === "Male" || gender === "Female" || gender === "Other")) {
      errors.push("Gender must be Male, Female or Other");
    }
    
    if (aboutMe.length < 16) { 
      errors.push("A self-description is required (at least 16 characters)");
    }
    
    return errors;
  };
  const onSubmitScreen0 = () => {
    const errors = validateScreen0();
    setErrorMsg(errors); // Update state with all errors at once
    if (errors.length === 0) {
      console.log("Form is valid, proceed with submission.");
      setScreen(1)
    } else {
      console.log("ERRORS:", errors);
    }
  };

  const validateScreen1 = () => {
    const validSigns = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const errors = [];
  
    const cleanSign = (sign:string) => sign.trim().toLowerCase();
    const isValidSign = (sign:string) => validSigns.map(s => s.toLowerCase()).includes(cleanSign(sign));
  
    if (!isValidSign(sun)) {
      errors.push('Invalid Sun sign.');
    }
  
    if (!isValidSign(moon)) {
      errors.push('Invalid Moon sign.');
    }
  
    if (!isValidSign(asc)) {
      errors.push('Invalid Ascendant sign.');
    }
  
    return errors;
  };
  const onSubmitScreen1 = () => {
    const errors = validateScreen1();
    setErrorMsg(errors); // Update state with all errors at once
    if (errors.length === 0) {
      console.log('Screen 1 is valid, proceeding to the next screen.');
      setScreen(2);
    } else {
      console.log('Screen 1 Errors:', errors);
    }
  };
  const validateScreen2 = () => {
    let errors = []
    if(movies.length < 1){
      errors.push("we need at least 1 movie")
    }
    if(books.length < 1){
      errors.push("we need at least 1 book")
    }
    if(music.length < 1){
      errors.push("we need at least 1 music")
    }
    return errors

  };
  const onSubmitScreen2 = () => {
    const errors = validateScreen2();
    if (errors.length === 0){
      console.log("Form is valid, proceed with submission.");
      setScreen(3)

    }
  };
  const validateScreen3 = () => {
    const errors:any = []
  
    return errors

  };
  const onSubmitScreen3 = () =>{

    const errors = validateScreen3()
    
    if (errors.length === 0){
      setScreen(4)
    }
    else{

      console.log("errors in screen 3", errors);
      
    }
    

  };

  //submit profile
  async function onSubmit() {
    console.log("SUBMITING");
    
    const data = {
      auth0_id:user?.sub,
      name: user?.name,
      email: user?.email,
      location: {latitude: user?.lat, logitude:user?.lon},
      city:user?.city,
      movies,
      books,
      music,
      yearOfBirth,
      aboutMe,
      gender,
      sun,
      moon,
      asc,
      encodedImage
    }

    try {
      fetch('http://192.168.0.3:3001/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => { response.json().then(json => {

        console.log("JSON", json);

        router.navigate('/home/profile')
        
      })})
        

    }catch(e){
      console.log("ERROR POSTING", e);   
    }
  };

  return (
  <>
    <ImageBackground
     source={require('../assets/images/background.png')}
     style={styles.background_image}
     resizeMode="cover"
    > 
    

      {errorMessage.length > 0 && (
        errorMessage.map(error => <Text key={error}>{error}</Text>)
      )}


      {error && <Text style={styles.errorText}>Authentication error</Text>}
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      
      <ScreenNav screen={screen}/>

      {screen === 0 && (
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

          <TouchableOpacity style={styles.button} onPress={onSubmitScreen0}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        
      )}

      {screen === 1 && (
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
         <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Image source={require('../assets/images/moon3d.png')} style={styles.input_image} />
              <Text style={styles.inputLabel}>Moon</Text>
              <TextInput style={styles.input} onChangeText={setMoon} />
            </View>
            <View style={styles.inputGroup}>
              <Image source={require('../assets/images/sun3d.png')} style={styles.input_image} />
              <Text style={styles.inputLabel}>Sun</Text>
              <TextInput style={styles.input}  onChangeText={setSun}/>
            </View>
            <View style={styles.inputGroup}>
              <Image source={require('../assets/images/asc3d.png')} style={styles.asc_image} />
              <Text style={styles.inputLabel}>Ascendant</Text>
              <TextInput style={styles.input} onChangeText={setAsc} />
            </View>
            <TouchableOpacity style={styles.button} onPress={onSubmitScreen1}>
            <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

          </View>
          </ScrollView>
          </KeyboardAvoidingView>
      )}

      {screen === 2 && (
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
       
         
          <Selector itemName="movie" items={movies} setSelection={setMovies} onSearch={fetchMovies} />
          <Selector itemName="book" items={books} setSelection={setBooks} onSearch={fetchBooks} />          
          <Selector itemName="music" items={music} setSelection={setMusic} onSearch={fetchMusic} />
          
          <TouchableOpacity style={styles.button} onPress={onSubmitScreen2}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        
        </ScrollView>
        </KeyboardAvoidingView>
      )}

      {screen === 3 && (
        <>

        <View style={styles.formContainer}>
        
        <ProfilePictureUploadScreen updateImage={setPicture}/>

        {picture && <Image source={{ uri: picture }} style={styles.picture} />}
        
            <TouchableOpacity style={styles.button} onPress={onSubmitScreen3}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 4 && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>Name: {user?.name}</Text>
          <Text style={styles.summaryText}>Gender: {gender}</Text>
          <Text style={styles.summaryText}>Born: {yearOfBirth}</Text>
          <Text style={styles.summaryText}>Location: {user?.city}</Text>
          <Text style={styles.summaryText}>Sun: {sun}</Text>
          <Text style={styles.summaryText}>Moon: {moon}</Text>
          <Text style={styles.summaryText}>Ascendant: {asc}</Text>
          <Text style={styles.summaryText}>Movies: {movies.join(', ')}</Text>
          <Text style={styles.summaryText}>Books: {books.join(', ')}</Text>
          <Text style={styles.summaryText}>Music: {music.join(', ')}</Text>
          <Text>About Me: {aboutMe}</Text>
          <Button title="Back" onPress={() => setScreen(0)} />
          <Button title="Submit" onPress={onSubmit} />
        </View>
        </ScrollView>
      )}
    
    </ImageBackground> 
    </>
      
    
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: 'black', },
  scrollContainer:{flexGrow:1},
  scrollViewContainer: { padding: 20, alignItems: 'center' },
  formContainer: { padding:20, width: '100%' },
  formTitle:{marginBlockStart:20,alignSelf:'center', textAlign:'center', fontWeight:'bold', marginBottom:15},
  inputGroup: { marginBottom: 15 },
  inputLabel: { fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#A7A3CA', padding: 10, borderRadius: 5 },
  textarea: { height: 100, textAlignVertical: 'top' },
  button: { marginTop: 20, backgroundColor: '#161954', padding: 15, borderRadius: 10, alignItems: 'center', alignSelf:'center' },
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

export default Registration;
