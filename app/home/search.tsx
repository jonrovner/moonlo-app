import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from 'react-native-auth0'
import ListedProfile from '../components/listedProfile'
import Waiting from '../components/waiting'
import { useLocalSearchParams } from 'expo-router';
import { useProfile  } from '../context/ProfileContext'
import { fetchWithTimeout } from '../utils/fetchWithTimeout';

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
  picture_url:string,
  favs:string[]
}

const Search = () => {
  const {getCredentials} = useAuth0()
  const [waiting, setWaiting] = useState<boolean>(true)
  const { profile, setProfile } = useProfile();
  const favs = profile.favs ? String(profile.favs).split(",").filter(Boolean) : [];
  
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async (moon:string) => {
    try {
      const credentials = await getCredentials()
      const response = await fetchWithTimeout('https://moonlo-backend.onrender.com/api/users/moon/'+moon,{
        headers:{
          Authorization: 'Bearer '+credentials?.accessToken
        }
      })
      const json: User[] = await response.json()
      setUsers(json)
      setWaiting(false)

    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    if (profile.moon){    
      fetchUsers(String(profile.moon))
    }
  }, [])

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
      faved={favs.includes(user.auth0_id)} 
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
        auth0_id:String(profile.auth0_id),
        picture_url:String(profile.picture_url),
        name:String(profile.name),
        email:String(profile.email)
      }}
      onFavoriteChange={(userId, isFavorited) => {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.auth0_id === userId 
              ? { ...user, faved: isFavorited } 
              : user
          )
        );

        if (isFavorited) {
          if (!favs.includes(userId)) {
            const newFavs = [...favs, userId];
            setProfile((prev: typeof profile) => ({
              ...prev,
              favs: newFavs.join(',')
            }));
          }
        } else {
          const newFavs = favs.filter(id => id !== userId);
          setProfile((prev: typeof profile) => ({
            ...prev,
            favs: newFavs.join(',')
          }));
        }
      }}
      />
     
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
