import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import {useAuth0} from 'react-native-auth0';

const LoginButton = () => {

 const {authorize} = useAuth0();
    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };


  return (
    <Pressable onPress={onPress}  style={styles.login_button}>
          <Text style={styles.login_text} >LOG IN</Text>
    
        </Pressable>
  )
}

export default LoginButton

const styles = StyleSheet.create({
    login_button:{
      height:60,
      padding:10,
      backgroundColor:'#7679B9',
      color:'white',
      borderRadius:10,
      display:'flex',
      justifyContent:'center',
      textAlign:'center',
      alignItems:'center'

    },
    login_text:{
        color:'white',
        fontFamily:'work'
    }
})