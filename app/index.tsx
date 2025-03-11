import { StyleSheet, Text, View, ImageBackground, Pressable, Button } from 'react-native'
import React from 'react'
import { Auth0Provider } from 'react-native-auth0';
import App from './app';


const index = () => {
  
  return (
  <Auth0Provider
    domain="dev-jrovner.us.auth0.com"
    clientId="DG1DGX6d8luYCJ4etHqNFLhuDmoZcuxM"
    >
     <App />
   </Auth0Provider>   
  )
}

export default index