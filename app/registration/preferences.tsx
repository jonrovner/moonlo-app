import { TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, View, TextInput } from 'react-native'
import React from 'react'
import Selector from '../components/selector';
import { fetchMovies, fetchBooks, fetchMusic } from '../utils';

interface Props {
    movies:string[];
    books:string[];
    music:string[];
    setMovies:(movies:string[])=>void;
    setBooks:(books:string[])=>void;
    setMusic:(music:string[])=>void;
    onSubmit:()=>void
}

const Preferences:React.FC<Props> = ({
    movies,
    books,
    music,
    setMovies,
    setBooks,
    setMusic,
    onSubmit
}) => {



  return (
    <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.scrollContainer}>    
            <Selector itemName="movie" items={movies} setSelection={setMovies} onSearch={fetchMovies} />
            <Selector itemName="book" items={books} setSelection={setBooks} onSearch={fetchBooks} />          
            <Selector itemName="music" items={music} setSelection={setMusic} onSearch={fetchMusic} />
          
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        
        </ScrollView>
        </KeyboardAvoidingView>
  )
}

export default Preferences

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
  
})