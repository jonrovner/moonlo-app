import {Image, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'

const images = [
    require('../../assets/images/waiting-heart.png'), 
    require('../../assets/images/waiting-moon.png'),  
 ];
 

const Waiting = () => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 500);
    
        return () => clearInterval(interval);
      }, []);
  return (
   
    <View style={styles.background_image}>
     <Image source={images[index]} style={styles.image} />
      
    </View>
  )
}

export default Waiting

const styles = StyleSheet.create({
background_image:{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center' },
image:{width:'100%', height:'100%'}

})