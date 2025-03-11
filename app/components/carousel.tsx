import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";

const images = [
   require('../../assets/images/moon_1.png'), 
   require('../../assets/images/moon_2.png'), 
   require('../../assets/images/moon_3.png'), 
   require('../../assets/images/moon_4.png') 
];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
      <Image source={images[index]} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  
  image: {
    marginTop:80,
    flex:1,
    resizeMode: "contain",
  },
});

export default ImageCarousel;
