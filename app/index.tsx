import { StyleSheet, Text, View, ImageBackground, Pressable, Button } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import {Auth0Provider} from 'react-native-auth0'

const index = () => {
  
  return (
   <Auth0Provider
    domain="dev-jrovner.us.auth0.com"
    clientId="DG1DGX6d8luYCJ4etHqNFLhuDmoZcuxM"
    >

  <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require("../assets/images/space.jpg")}
    >
    <View>
    
      <Text style={styles.title}>Welcome</Text>
    
      <Link href="/registration" asChild>
        <Pressable>
          <Text style={styles.start}>Lets get started</Text>
        </Pressable>
      </Link>
    
    </View>

    </ImageBackground>  
    </Auth0Provider>
    
    
  )
}

export default index

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    opacity:0.8
  },
  title: {
    fontSize:60,
    color: 'white',
    backgroundColor: 'darkslateblue',
    padding:1,
    textAlign: 'center',
   
  },
  start:{
    padding:10,
    backgroundColor:'blue',
    color:'white',
    fontSize:30,
    textAlign:'center'

  }

})
