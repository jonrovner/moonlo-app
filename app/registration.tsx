import { Pressable, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, ViewComponent } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useAuth0, Auth0Provider } from 'react-native-auth0';

//import * as Location from 'expo-location';

const Registration = () => {
/* 
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null); */
    
    const {authorize, clearSession, user, error, isLoading} = useAuth0();

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };
/* 
    useEffect(() => {

        async function getCurrentLocation() {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
    
        getCurrentLocation();

      }, []); */
    
      //console.log("location ", location);
      /*
       location  
       {"coords": 
         {"accuracy": 100, 
         "altitude": 43.79999923706055, 
         "altitudeAccuracy": 100, 
         "heading": 0, 
         "latitude": -34.5900522, 
         "longitude": -58.4681273, 
         "speed": 0
         }, 
         "mocked": false, 
         "timestamp": 1740398161920}

      */

    const [name, setName] = useState("")
    const [moon, setMoon] = useState("")
    const [city, setCity] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [looking, setLooking] = useState("")
    const [movies, setMovies] = useState([
      { "title": "Inception", "year": "2010" },
      { "title": "The Matrix", "year": "1999" },
      { "title": "Interstellar", "year": "2014" },
      { "title": "Pulp Fiction", "year": "1994" },
      { "title": "The Dark Knight", "year": "2008" },
      { "title": "Forrest Gump", "year": "1994" },
      { "title": "Fight Club", "year": "1999" },
      { "title": "The Lord of the Rings: The Fellowship of the Ring", "year": "2001" },
      { "title": "The Shawshank Redemption", "year": "1994" },
      { "title": "Parasite", "year": "2019" }
  ])
  

    const [query, setQuery] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([""]);
    const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  
    const handleInputChange = (text: string) => {

      setQuery(text);
      
      if (text.length > 0) {
        const results = movies.filter((movie) =>
          movie.title.toLowerCase().includes(text.toLowerCase())
        ).map((movie) => movie.title);
        setFilteredMovies(results);
      } else {
        setFilteredMovies([]);
      }
    };

    const handleMovieSelection = (movie: string) => {

      setSelectedMovies(selectedMovies.concat(movie));
      setQuery("");
      setFilteredMovies([]);

    }

    const handleMovieRemoval = (movie: string) => {
      console.log("romoving movie", movie);
      
      setSelectedMovies(selectedMovies.filter((filtermovie) => movie !== filtermovie));
    
    
    }
  
    return (
      <Auth0Provider
          domain="dev-jrovner.us.auth0.com"
          clientId="DG1DGX6d8luYCJ4etHqNFLhuDmoZcuxM"
          >
      
      <View style={styles.container}>
        
      
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>What are your favourite movies</Text>
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} placeholder='enter a word' onChangeText={handleInputChange}></TextInput>
              <Text style={styles.inputButton} >✓</Text>
            
            </View>

            {filteredMovies.length > 0 && (
            
            <FlatList 
              data={filteredMovies}
              contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
              renderItem={({ item }) => (
                <Pressable style={styles.suggestion} onPress={()=>handleMovieSelection(item)}>
                  <Text>{item}</Text>
                </Pressable>
                
              )}
              />
            
            )}
            {selectedMovies.length > 0 && (

            <FlatList
             data={selectedMovies}
             contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
             renderItem={({ item }) => (
                <View key={item} style={styles.selectedMovie} >
                  <Text style={styles.selectedMovieText}>{item.slice(0,20)}</Text>
                  <TouchableOpacity style={styles.removeButton} onPress={()=>handleMovieRemoval(item)}> 
                    <Text>×</Text>
                  </TouchableOpacity>
                </View>
                )}
                />
             
              )}
            
          </View>
          <Button title={"submit"} />
        
    </View>
    </Auth0Provider>
  )
}

export default Registration

const styles = StyleSheet.create({

    input:{
        flex:8,
        padding:10,
        margin:5,
        backgroundColor:'white',
        borderRadius:10
    },
    inputButton:{
        flex:1,
        padding:10,
        textAlign:'center',
        margin:5,
        backgroundColor:'#8a9ae0',
        borderRadius:10
    },

    inputLabel:{
        textAlign: 'left',
        fontSize:12,
        fontWeight:'800',
        marginBlock: 5
    },
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 50,
      height:10,
      backgroundColor: '#F5FCFF',
      alignItems: 'center',
      justifyContent:"flex-start"
    },
    inputField:{
      width: '90%',
      marginTop: 10,
      padding: 10,
      backgroundColor:'#8A9AE066',
      borderRadius: 10,
    
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    preview: {
      padding:5,
      backgroundColor: 'pink',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',

    },
    suggestion: {padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
    selectedMovieList:{zIndex:0},
    selectedMovie:{display:'flex', flexDirection:'row', gap:10, padding:10, backgroundColor:'#ECD4E6B2', color:'black', borderRadius:10, alignItems:'center', justifyContent:'space-between'},
    selectedMovieText:{fontSize:12, fontWeight:'800', color:'black'},
    removeButton:{textAlign:'center', borderColor:'red', borderWidth:1, padding:5, borderRadius:15},
})