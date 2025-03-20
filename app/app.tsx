import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import ImageCarousel from './components/carousel'
import LoginButton from './components/loginButton';
const image = require('../assets/images/background.png')

const App = () => {

    return(
      
      <View style={styles.container}>
        <ImageBackground
          source={image}
          style={styles.background_image}
          resizeMode="cover"
        >
          <View style={styles.container}>
        
              <ImageCarousel />

              <View style={styles.title_group}>
                  <Text style={styles.title}>MoonLo</Text>
                  <Text style={styles.title_text}>{`we’re like tinder, but more mystical. find your soulmate according to the stars, because the moon matters.`.toUpperCase()}</Text>
              </View>
              
                <View style={styles.login_group}>
                    <Link href="/registration" asChild>
                        <Pressable style={styles.start}>
                          <Text style={styles.start_text}>CREATE PROFILE</Text>
                        </Pressable>
                      </Link>
                      <Text>{`already have an account?`.toLocaleUpperCase()}</Text>
                      <LoginButton />
                </View>

          </View>
        </ImageBackground>

      </View>
        
    )

}
const styles = StyleSheet.create({
    container: {
      height:'100%',
      backgroundColor: '#CEC4D810',
      alignItems: 'center',
      justifyContent:'flex-start'
      
    },
    title_group:{
      flex:2,
      width:'90%',
      fontFamily:'work'
    },
    title: {
      fontSize:90,
      fontFamily:'Jaro',
      color: '#1C1A43',
      textAlign: 'center',
    },
    title_text:{
      fontFamily: 'work',
      color:'#161954',
      textAlign:'center'
    },

    login_group:{
      flex:2,
      display:'flex',
      gap:20,
      alignContent:'center',
      justifyContent:'center',
      marginBottom:50,

    },
    start:{
      height:60,
      padding:10,
      backgroundColor:'#222671',
      color:'white',
      borderRadius:10,
      display:'flex',
      justifyContent:'center'
    },
    start_text:{
        fontFamily:'work',
        fontWeight:'400',
        color:'white',
        textAlign:'center'
    },
    background_image:{width:'100%', height:'100%', }
    
})
export default App
  