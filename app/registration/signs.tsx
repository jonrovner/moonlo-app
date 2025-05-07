import { TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, View, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React from 'react'

const ZODIAC_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces'
]

interface Props {
    moon: string;
    sun: string;
    asc: string;
    setMoon:(moon:string)=>void;
    setSun:(sun:string)=>void;
    setAsc:(asc:string)=>void
    onSubmit:()=>void
}

const Signs:React.FC<Props> = ({
    moon,
    sun,
    asc,
    setMoon,
    setSun,
    setAsc,
    onSubmit
}) => {
  return (
    <KeyboardAvoidingView>
             <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formContainer}>
               <View style={styles.inputGroup}>
                 <Image source={require('../../assets/images/moon3d.png')} style={styles.input_image} />
                 <Text style={styles.inputLabel}>Moon</Text>
                 <View style={styles.pickerContainer}>
                   <Picker
                     selectedValue={moon}
                     onValueChange={setMoon}
                     style={styles.picker}
                     mode="dropdown"
                     itemStyle={styles.pickerItem}
                   >
                     <Picker.Item label="Select Moon Sign" value="" />
                     {ZODIAC_SIGNS.map((sign) => (
                       <Picker.Item key={sign} label={sign} value={sign} />
                     ))}
                   </Picker>
                 </View>
               </View>
               <View style={styles.inputGroup}>
                 <Image source={require('../../assets/images/sun3d.png')} style={styles.input_image} />
                 <Text style={styles.inputLabel}>Sun</Text>
                 <View style={styles.pickerContainer}>
                   <Picker
                     selectedValue={sun}
                     onValueChange={setSun}
                     style={styles.picker}
                     mode="dropdown"
                     itemStyle={styles.pickerItem}
                   >
                     <Picker.Item label="Select Sun Sign" value="" />
                     {ZODIAC_SIGNS.map((sign) => (
                       <Picker.Item key={sign} label={sign} value={sign} />
                     ))}
                   </Picker>
                 </View>
               </View>
               <View style={styles.inputGroup}>
                 <Image source={require('../../assets/images/asc3d.png')} style={styles.asc_image} />
                 <Text style={styles.inputLabel}>Ascendant</Text>
                 <View style={styles.pickerContainer}>
                   <Picker
                     selectedValue={asc}
                     onValueChange={setAsc}
                     style={styles.picker}
                     mode="dropdown"
                     itemStyle={styles.pickerItem}
                   >
                     <Picker.Item label="Select Ascendant Sign" value="" />
                     {ZODIAC_SIGNS.map((sign) => (
                       <Picker.Item key={sign} label={sign} value={sign} />
                     ))}
                   </Picker>
                 </View>
               </View>
               <TouchableOpacity style={styles.button} onPress={onSubmit}>
               <Text style={styles.buttonText}>Next</Text>
               </TouchableOpacity>
             </View>
             </ScrollView>
             </KeyboardAvoidingView>
  )
}

export default Signs

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
  picker:{
    backgroundColor: '#A7A3CA',
    borderRadius: 5,
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
    color: '#161954',
    fontSize: 18,
  },
  pickerContainer: { 
    backgroundColor: '#A7A3CA',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  pickerItem: {
    fontSize: 18,
    color: '#161954',
    height: Platform.OS === 'ios' ? 150 : 50,
  },
  picker_item:{padding:10, backgroundColor:"red"},
  background_image:{width:'100%', height:'100%', },
  age_input:{ width:'20%', backgroundColor: '#A7A3CA', height:50},
  summaryTitle:{fontSize:40, textAlign:'center',margin:'5%'},
  summaryText:{margin:10, padding:10, backgroundColor:'#A7A3CA', borderRadius:5},
  nav_container:{padding: 20, display:'flex', flexDirection:'row', gap:'60', marginBlockStart:20, alignSelf:'center'},
  nav:{height:8, flex:1, backgroundColor:'#A7A3CA', borderRadius:4},
})