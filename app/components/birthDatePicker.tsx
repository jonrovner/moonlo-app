import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';


const BirthDatePicker = () => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event:any, selectedDate:any) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode:string) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <SafeAreaView>
        <Button onPress={showDatepicker} title="Select birth date!" />
        <Button onPress={showTimepicker} title="Select birth time!" />
        <Text style={styles.selectedDate}>selected: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </SafeAreaView>
    );
}

export default BirthDatePicker

const styles = StyleSheet.create({
    selectedDate:{
        backgroundColor:'white',
        padding:20,
        color:'black'

    }
})