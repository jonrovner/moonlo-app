import { ScrollView, KeyboardAvoidingView, Switch, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Selector from './components/selector';
import { fetchMovies, fetchBooks, fetchMusic } from './utils.js';
import { useAuth0 } from 'react-native-auth0';
import {Picker} from '@react-native-picker/picker'

const Registration = () => {
  //auth
  const { authorize, user, error, getCredentials, isLoading } = useAuth0();
  

  //profile attributes
  const [screen, setScreen] = useState(0);
  const [movies, setMovies] = useState<string[]>([]);
  const [books, setBooks] = useState<string[]>([]);
  const [music, setMusic] = useState<string[]>([]);
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [gender, setGender] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [kids, setKids] = useState<boolean>(false);
  const [drink, setDrink] = useState<boolean>(false);
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");
  const [lookingFor, setLookingFor] = useState('other');
  const [sun, setSun] = useState("")
  const [moon, setMoon] = useState("")
  const [asc, setAsc] = useState("")


  const toggleSmokingSwitch = () => setSmoking(previousState => !previousState);  
  const toggleKidsSwitch = () => setKids(previousState => !previousState);  
  const toggleDrinkSwitch = () => setDrink(previous => !previous)

  async function checkSession() {
    try {
      await authorize();
      await getCredentials();
    } catch (e) {
      console.log('Authentication error:', e);
    }
  }

  async function onSubmit() {
    console.log("SUBMITING");
    
    const data = {
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
      lookingFor,
      smoking,
      drink,
      kids,
      minAge,
      maxAge,
      sun,
      moon,
      asc
    }

    try {
      fetch('http://192.168.0.3:3001/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => { response.json()})
        .then(json => {

          console.log("JSON", json);
          
        })

    }catch(e){
      console.log("ERROR POSTING", e);
      
    }
     
    
    


  }   

  return (
  <>

    <ImageBackground
     source={require('../assets/images/background.png')}
     style={styles.background_image}
     resizeMode="cover"
    > 
    
      {error && <Text style={styles.errorText}>Authentication error</Text>}
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
     

      {screen === 0 && (
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

          <TouchableOpacity style={styles.button} onPress={() => setScreen(1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
            <TouchableOpacity style={styles.button} onPress={() => setScreen(2)}>
            <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

          </View>
          </ScrollView>
          </KeyboardAvoidingView>
      )}

      {screen === 2 && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Taste</Text>
         
          <Selector itemName="movie" items={movies} setSelection={setMovies} onSearch={fetchMovies} />
          <Selector itemName="book" items={books} setSelection={setBooks} onSearch={fetchBooks} />          
          <Selector itemName="music" items={music} setSelection={setMusic} onSearch={fetchMusic} />
          
          <TouchableOpacity style={styles.button} onPress={() => setScreen(3)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 3 && (
        <>
        <Text style={styles.formTitle}>Deal Brakers</Text>
        <View style={styles.formContainer}>
        <View style={styles.dealbraker}>
          <Text>Looking for</Text>
          <Picker
            selectedValue={lookingFor}
            onValueChange={(itemValue, itemIndex) =>
               setLookingFor(itemValue)
            }
            style={styles.picker}
            itemStyle={styles.picker_item}
            mode='dropdown'
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          <Text>{lookingFor}</Text>

        </View>
        <View style={styles.dealbraker}>
         <Text>Smoking</Text> 
         <Switch
          trackColor={{false: 'black', true: 'white'}}
          thumbColor={smoking ? 'green' : 'red'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSmokingSwitch}
          value={smoking}
        />
         <Text>{smoking ? 'No problem': 'No way'}</Text>
        </View>
        <View style={styles.dealbraker}>
         <Text>Children</Text> 
         <Switch
          trackColor={{false: 'black', true: 'white'}}
          thumbColor={kids ? 'green' : 'red'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleKidsSwitch}
          value={kids}
        />
           <Text>{kids ? 'No problem': 'No way'}</Text>
        </View>
        <View style={styles.dealbraker}>
         <Text>Alcohol</Text> 
         <Switch
          trackColor={{false: 'black', true: 'white'}}
          thumbColor={drink ? 'green' : 'red'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDrinkSwitch}
          value={drink}
          />
          <Text>{drink ? 'No problem': 'No way'}</Text>
        </View>
        <View style={styles.dealbraker}>
          <Text>Age</Text>
          <TextInput style={styles.age_input}  onChangeText={setMinAge}/>
          <Text>TO</Text>
          <TextInput style={styles.age_input}  onChangeText={setMaxAge} />

        </View>
        
        <TouchableOpacity style={styles.button} onPress={() => setScreen(4)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 4 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Summary</Text>
          <Text>Movies: {movies.join(', ')}</Text>
          <Text>Books: {books.join(', ')}</Text>
          <Text>Music: {music.join(', ')}</Text>
          <Text>Year of Birth: {yearOfBirth}</Text>
          <Text>Gender: {gender}</Text>
          <Text>About Me: {aboutMe}</Text>
          <Button title="Back" onPress={() => setScreen(3)} />
          <Button title="Submit" onPress={onSubmit} />
        </View>
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
  button: { marginTop: 20, backgroundColor: '#161954', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  radioButton: { padding: 10 },
  radioText: { color: '#333' },
  radioSelected: { color: '#8a9ae0', fontWeight: 'bold' },
  errorText:{color:'red'},
  loadingText:{color:'green'},
  screenControls:{display:'flex', flexDirection:'row'},
  summaryContainer:{backgroundColor:'#A7A3CA'},
  summaryText:{color:'black'},
  input_image:{width:100, height:100, alignSelf:'center'},
  asc_image:{width:200, height:100, alignSelf:'center'},
  dealbraker:{width:'100%', display:'flex', flexDirection:'row', padding:10, backgroundColor:'#A7A3CA30', marginBlock:15, justifyContent:'space-between', alignItems:'center' },
  picker:{padding:10},
  picker_item:{padding:10, backgroundColor:"red"},
  background_image:{width:'100%', height:'100%', },
  age_input:{ width:'20%', backgroundColor: '#A7A3CA', height:50}
});

export default Registration;
