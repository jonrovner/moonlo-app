import { ImageBackground, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { useAuth0 } from 'react-native-auth0'
import ListedProfile from '../components/listedFav'

interface User {
  auth0_id: string;
  name: string;
  email: string;
  location: string;
  city: string;
  movies: string[];
  books: string[];
  music: string[];
  yearOfBirth: string;
  aboutMe: string;
  gender: string;
  sun: string;
  moon: string;
  asc: string;
  picture_url: string;
  favs:string[]
}

const Favs = () => {
  const { getCredentials } = useAuth0()
  const { profile } = useProfile()
  const [users, setUsers] = useState<User[]>([])

  async function getUsers() {
    if (!profile?.favs || profile.favs.length === 0) return

    try {
      const credentials = await getCredentials()
      const results:any = await Promise.all(
        profile.favs.map(async (userId: string) => {
         
          let id = encodeURIComponent(userId)
          
          let response = await fetch(`http://192.168.0.76:3001/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${credentials?.accessToken}`
            }
          })

          let json = await response.json()
        
          return json
        })
      )
      setUsers(results)  
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    if (profile?.favs?.length > 0) {
      getUsers()
    }
  }, [profile?.favs]) // Added dependency


  return (
      <ImageBackground 
        source={require('../../assets/images/search-background.png')}
         style={styles.background_image}
         resizeMode="cover"
        >
        <ScrollView>
       <View style={styles.title_bar}>
         <Text style={styles.title_text}>MY</Text>
            <Image 
              source={require('../../assets/images/heart-baloon.png')}
              style={styles.title_image}
            />
         <Text style={styles.title_text}>FAVS</Text>
      
            </View>     
      {users.map((user, index) => (
      
        <View key={index}>
            <ListedProfile 
             user={
              {auth0_id:user.auth0_id,
        picture_url:user.picture_url,
        name:user.name,
        city:user.city,
        sun:user.sun,
        asc:user.asc,
        email:user.email
             }}
             me={{
              auth0_id:profile.auth0_id,
              picture_url:profile.picture_url,
              name:profile.name,
              email:profile.email
             }} />

        </View> // Assuming `user` has a `name` field
      ))}
      </ScrollView>
    </ImageBackground>
  )
}

export default Favs

const styles = StyleSheet.create({
  background_image:{width:'100%', height:'100%', },
  title_bar:{backgroundColor:'#BBBDDE50', height:100, display:'flex', flexDirection:'row', padding:10, justifyContent:'space-around', alignItems:'center'},
  title_image:{height:70, width:70},
  title_text:{fontSize:24},
})