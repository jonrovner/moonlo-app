import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker';
import { useState, useRef } from "react";

export const GenderPicker = () => {

    const [gender, selectGender] = useState("male")
   
  
  return (
  <View>
  <Text>Please select your gender</Text>
   <Picker
   
    selectedValue={gender}
    onValueChange={(itemValue, itemIndex) =>
      selectGender(itemValue)
    }>
    <Picker.Item label="Female" value="female" />
    <Picker.Item label="Male" value="male" />
    <Picker.Item label="None" value="none" />
  </Picker>
  

  </View>
  
  )
  
}

export default GenderPicker

const styles = StyleSheet.create({})