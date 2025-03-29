import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from 'react-native-auth0'
import ListedProfile from '../components/listedProfile'
import Waiting from '../components/waiting'


interface User {
  auth0_id: string
  name: string
  email: string
  location: { latitude: string, longitude: string }
  city: string
  movies: string[]
  books: string[]
  music: string[]
  yearOfBirth: string
  aboutMe: string
  gender: string
  sun: string
  moon: string
  asc: string
  picture_url:string
}

const Search = () => {

  const [waiting, setWaiting] = useState<boolean>(true)

  const [profile, setProfile] = useState<User>({
    auth0_id: "",
    name: "",
    email: "",
    location: { latitude: "", longitude: "" },
    city: "",
    movies: [],
    books: [],
    music: [],
    yearOfBirth: "",
    aboutMe: "",
    gender: "",
    sun: "",
    moon: "",
    asc: "",
    picture_url:""
  })

  const { authorize, user, error, getCredentials, isLoading } = useAuth0();

  async function fetchProfile(user:any){

      let id = encodeURIComponent(user.sub)
      let url = 'http://192.168.0.76:3001/api/users/'+id
      console.log("url is ", url);
      
      try {
      const response = await fetch(url)
      const json = await response.json()
        //console.log("I GOT PROFILE", json);
      setProfile(json)
  
      } catch (e){
        console.log("ERROR FROM API", e);
      }
    }
    
  async function checkSession() {
      if (!user){
        console.log("no user");
        
        try {
          await authorize();
          await getCredentials();
         console.log("user", user);
        } catch (e) {
          console.log('Authentication error:', e);
        }
      }
    }
    
  useEffect(()=>{
      checkSession()
      fetchProfile(user);
    }, [])
  
  useEffect(()=>{console.log("profile", profile);
    },[profile])


  const [users, setUsers] = useState<User[]>([])

  

  const fetchUsers = async (moon:string) => {
    try {
      const response = await fetch('http://192.168.0.76:3001/api/users/moon/'+moon)
      const json: User[] = await response.json()
      setUsers(json)
      setWaiting(false)
      
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {

    if (profile.moon){
      console.log("getting users");
      
      fetchUsers(profile.moon)

    }
  }, [profile])

  return (
    <ImageBackground 
    source={require('../../assets/images/search-background.png')}
     style={styles.background_image}
     resizeMode="cover"
    >
      {waiting && <Waiting />}

    <View style={styles.title_bar}>
      <Image 
        source={require('../../assets/images/heart-baloon.png')}
        style={styles.title_image}
      />
      <Text style={styles.title_text}>MOON MATCHES</Text>
      <Image style={styles.filter_icon}
        source={require('../../assets/images/filters-icon.png')}
      />
    </View>
    <ScrollView >
    {users.length > 0 && users.map(user => (
      <ListedProfile 
      key={user.auth0_id} 
      user={{
        auth0_id:user.auth0_id,
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
      }

      } />
     
      ))}
      </ScrollView>
    </ImageBackground>
  )
}

export default Search

const styles = StyleSheet.create({

  background_image:{width:'100%', height:'100%', },
  title_bar:{backgroundColor:'#BBBDDE50', height:100, display:'flex', flexDirection:'row', padding:10, justifyContent:'space-between', alignItems:'center'},
  title_image:{height:70, width:70},
  title_text:{fontSize:24},
  filter_icon:{marginBlockEnd:10}
  
})
