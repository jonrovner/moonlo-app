import { ScrollView, StyleSheet, Text, View,  Button, ImageBackground  } from 'react-native';
import React, { useState, useEffect  } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import ProfilePictureUploadScreen from './components/pickImage'
import Details from './registration/details';
import Signs from './registration/signs';
import Preferences from './registration/preferences';
import Waiting from './components/waiting';
import * as FileSystem from 'expo-file-system';

const Registration = () => {
  
  const [waiting, setWaiting] = useState(true)
  
 
  //auth0
  const { authorize, user, error, getCredentials, isLoading, clearSession } = useAuth0();
  
  async function checkSession() {
    try {
      await clearSession(); 
      await authorize({audience:"https://moonlo-api"}); 
      await getCredentials();
    } catch (e) {
      console.log('Authentication error:', e);
    }
  }
  
  async function checkProfile(id:string){
    let credentials = await getCredentials()
    let url = 'http://192.168.0.76:3001/api/users/'+ encodeURIComponent(id);
    try {
      const response = await fetch(url, {
        headers:{
          Authorization: 'Bearer ' + credentials?.accessToken
        }
      })
      const json = await response.json()
      if (json.auth0_id){
        console.log("FOUND USER");
        
        router.navigate("/home/profile")
      }


  } catch (e){
    console.log("error checking profile", e);
    
  }
  }

  useEffect(()=>{
    checkSession()
  }, [])

  useEffect(()=>{
    if (user?.sub){
      checkProfile(user.sub)
    }
    setWaiting(false)
    
  }, [user])

  

  //non-auth0 profile attributes
  const [movies, setMovies] = useState<string[]>([]);
  const [books, setBooks] = useState<string[]>([]);
  const [music, setMusic] = useState<string[]>([]);
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [sun, setSun] = useState("")
  const [moon, setMoon] = useState("")
  const [asc, setAsc] = useState("")
  const [picture, setPicture] = useState<string>("")
  const [encodedImage, setEncodedImage] = useState<string>()

  //picture encodingdf

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
    if (!encodedImage){
      errors.push("we need a profile pic")
    }
  
    return errors

  };
  const onSubmitScreen3 = () => {

    const errors = validateScreen3()
    
    if (errors.length === 0){
      onSubmit()
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
      console.log("DATA: ", data.encodedImage?.substring(0,20))
    try {
      let credentials = await getCredentials()

      fetch('http://192.168.0.76:3001/api/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer '+ credentials?.accessToken
        },
        body: JSON.stringify(data)
      }).then(response => { 
        response.json().then(json => {
        console.log("JSON", json);
         if (json.new_user){

           router.navigate('/home/profile')
         } 
        
      })})
        

    }catch(e){
      console.log("ERROR POSTING", e);   
    }
  };

  return (
  <>
    {waiting && <Waiting />}

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
        <Details 
        user={user}
        gender={gender}
        yearOfBirth={yearOfBirth}
        aboutMe={aboutMe}
        setAboutMe={setAboutMe}
        setGender={setGender}
        setYearOfBirth={setYearOfBirth}
        onSubmit={onSubmitScreen0}
        
        />
        
      )}

      {screen === 1 && (
       <Signs 
       moon={moon}
       sun={sun}
       asc={asc}
       setMoon={setMoon}
       setSun={setSun}
       setAsc={setAsc}
       onSubmit={onSubmitScreen1}
       />
      )}

      {screen === 2 && (
       <Preferences 
       movies={movies}
       books={books}
       music={music}
       setMovies={setMovies}
       setBooks={setBooks}
       setMusic={setMusic}
       onSubmit={onSubmitScreen2}
       />
      )}

      {screen === 3 && (
        
      <ProfilePictureUploadScreen 
       updateImage={setEncodedImage} 
       onSubmit={onSubmitScreen3}/>
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
}

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

export default Registration;
