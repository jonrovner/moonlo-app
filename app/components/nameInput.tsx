import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const NameInput = (props) => {
  
    return (
    <View>
      <Text>NameInput</Text>
      <TextInput
        style={{height: 40, padding: 5}}
        placeholder="Enter your name"
        onChangeText={(newText) => props.onNameSubmit(newText)}
      />
    </View>
  )
}

export default NameInput

const styles = StyleSheet.create({})