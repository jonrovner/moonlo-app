import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from 'react-native-auth0'


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
  useEffect
  console.log("user", user);

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
    <View style={styles.title_bar}>
      <Image 
        source={require('../../assets/images/heart-baloon.png')}
        style={styles.title_image}
      />
      <Text style={styles.title_text}>MOON MATCHES</Text>
      <Image
        source={require('../../assets/images/filters-icon.png')}
      />
    </View>

    {users.length > 0 && users.map(user => (
      <View key={user.auth0_id} style={styles.user_profile_container}>
        <View style={styles.picture_group}>
          <Image source={{uri: user.picture_url}}  style={styles.profile_pic}/>

          <View style={styles.details_container}>
              <Text style={styles.picture_title}>{user.name.split(" ")[0]}</Text>
              <Text>{user.city}</Text>
              <View style={styles.signs_container}>
                <View style={styles.sign}>
                  <Image 
                  source={require('../../assets/images/sun3d.png')}
                  style={styles.sign_image}
                  />
                  <Text>{user.sun}</Text>
                  
                </View>
                <View style={styles.sign}>
                  
                <Image 
                  source={require('../../assets/images/asc3d.png')}
                  style={styles.sign_image}
                  />
                  <Text>{user.asc}</Text>
               
               
                </View>


              </View>
          
          
          </View>


        </View>
       </View> 
      ))}

    </ImageBackground>
  )
}

export default Search

const styles = StyleSheet.create({

  background_image:{width:'100%', height:'100%', },
  title_bar:{backgroundColor:'#BBBDDE50', height:100, display:'flex', flexDirection:'row', padding:10, justifyContent:'space-between', alignItems:'center'},
  title_image:{height:70, width:70},
  title_text:{fontSize:24},
  user_profile_container:{backgroundColor:'#BBBDDE50', margin:10, padding:10, borderRadius:10},
  profile_pic:{flex:1, borderRadius:20},
  picture_group:{display:'flex', flexDirection:'row', padding:2, gap:15, justifyContent:'center'},
  details_container:{flex:1, display:'flex', gap:20, justifyContent:'flex-start', alignItems:'center'},
  picture_title:{fontSize:24, fontWeight:'bold'},
  signs_container:{display:'flex', flexDirection:'row', gap:10},
  sign:{flex:1, backgroundColor:'#8184BE40', display:'flex', padding:10, justifyContent:'center', borderRadius:15},
  sign_image:{width:30, height:30}
})
