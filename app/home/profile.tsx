import { StyleSheet, Image, Text, View, ImageBackground, ScrollView} from 'react-native'
import React, {useState, useEffect}from 'react'
import { useAuth0 } from 'react-native-auth0'
import Logout from '../components/logout'
import Waiting from '../components/waiting'
const edit = require('../../assets/images/edit.png');

interface User {
  auth0_id:string
  name:string
  email:string
  location:string
  city:string
  movies:string[]
  books:string[]
  music:string[]
  yearOfBirth:string
  aboutMe:string
  gender:string
  minAge:string
  maxAge:string
  sun:string
  moon:string
  asc:string
  picture_url:string
}

const profile = () => {

  const [waiting, setWaiting] = useState<boolean>(true)

  const [profile, setProfile] = useState<User>({
    auth0_id: "",
    name: "",
    email: "",
    location: "",
    city: "",
    movies: [],
    books: [],
    music: [],
    yearOfBirth: "",
    aboutMe: "",
    gender: "",
    minAge: "",
    maxAge: "",
    sun: "",
    moon: "",
    asc: "",
    picture_url:""
});

  
  const { authorize, user, error, getCredentials, isLoading } = useAuth0();
  //console.log("user: ", user);
  
  async function fetchProfile(user:any){
    let id = encodeURIComponent(user.sub)
    try{
    const response = await fetch('http://192.168.0.76:3001/api/users/'+id)
    const json = await response.json()
      //console.log("I GOT PROFILE", json);
    setProfile(json)
    setWaiting(false)

    } catch (e){
      console.log("ERROR FROM API", e);
    }
  }
  
  async function checkSession() {
    if (!user){
      try {
        await authorize();
        await getCredentials();
       //console.log("user", user);
      } catch (e) {
        console.log('Authentication error:', e);
      }
    }
  }
  
  useEffect(() => {
    checkSession();
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchProfile(user);
    } else {
      setProfile({
        auth0_id: "",
        name: "",
        email: "",
        location: "",
        city: "",
        movies: [],
        books: [],
        music: [],
        yearOfBirth: "",
        aboutMe: "",
        gender: "",
        minAge: "",
        maxAge: "",
        sun: "",
        moon: "",
        asc: "",
        picture_url: ""
      });
    }
  }, [user]);
  
  
  return (
    <> 
     {waiting && <Waiting />}
     <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.profileHead}>
          <View style={styles.picture_group}>
              {user &&  (
              <View style={styles.profile_pic_container}>
                <Image source={{uri: profile.picture_url}} style={styles.profile_pic} />
              </View>
              )}
              {profile && <Text style={styles.profile_name}>{profile.name.split(" ")[0]}</Text>}
          </View>
          <View style={styles.match_me_container}>
            <Image source={edit} style={styles.edit_icon}/>
            <ImageBackground
            source={require('../../assets/images/heart-baloon.png')}
            style={styles.background_image}
            resizeMode="cover"
            >
            
            </ImageBackground>
            <Text>MATCH ME</Text>
          </View>
        </View>

        <View style={styles.signs_grid}>
          
          <View style={styles.profile_moon}>
            <Image source={require('../../assets/images/moon3d.png')} style={styles.moon_image} />
            <View style={styles.sign_text_group}>
              <Text style={styles.moon_title}>{profile.moon}</Text>
              <Text style={styles.sign_text}>moon</Text>
            </View>
          </View>
          <View style={styles.sun_flex}>
            <View style={styles.profile_sign}>
              
              <Image source={require('../../assets/images/sun3d.png')} style={styles.moon_image} />
              <View style={styles.sign_text_group}>
                <Text style={styles.sign_title}>{profile.sun}</Text>
                <Text style={styles.sign_text}>sun</Text>
              </View>

            </View>
            <View style={styles.profile_sign}>
              <Image source={require('../../assets/images/asc3d.png')} style={styles.asc_image} />
              <View style={styles.sign_text_group}>
                <Text style={styles.sign_title}>{profile.asc}</Text>
                <Text style={styles.sign_text}>asc</Text>
              </View>
            </View>
          </View>
        </View>
      
        <Text style={styles.section_title}>Bio</Text>
        <View style={styles.profile_bio}>

              <Text>{profile.aboutMe}</Text>   

        </View>
        <Text style={styles.section_title}>Preferences</Text>
        <View style={styles.profile_bio}>
          
          <View style={styles.preference_title_container}>

            <Image style={styles.preference_image} source={require('../../assets/images/movies-icon.png')} />
            <Text style={styles.preference_title}>movies</Text>

          </View>
          {
            profile.movies.length>0 && profile.movies.map(movie => (
              <Text style={styles.preference_text} key={movie}>• {movie}</Text>                
            ))
          } 
          </View>   
           <View style={styles.profile_bio}>

          <View style={styles.preference_title_container}>

            <Image style={styles.preference_image} source={require('../../assets/images/books-icon.png')} />
            <Text style={styles.preference_title}>books</Text>

          </View>
          {
            profile.books.length>0 && profile.books.map(book => (
              <Text style={styles.preference_text} key={book}>• {book}</Text>                
            ))

          
          }
          </View>

          <View style={styles.profile_bio}>
          <View style={styles.preference_title_container}>

            <Image style={styles.preference_image} source={require('../../assets/images/music-icon.png')} />
            <Text style={styles.preference_title}>music</Text>

          </View>
          {
            profile.music.length>0 && profile.music.map(music => (
              <Text style={styles.preference_text} key={music}>• {music}</Text>                
            ))
          } 
          </View>   
        
      </View>
      <Logout />
    </ScrollView>
    </>
  )
}

export default profile

const styles = StyleSheet.create({
  container:{padding:30},
  picture_group:{flex:1, padding:10, marginBlockStart:10, backgroundColor:'#8184BE50', borderRadius:20, display:'flex', alignItems:'center', gap:5},
  title:{fontSize: 24 },
  background_image:{width:'100%', height:'100%'},
  scroll:{height:'100%', backgroundColor:'#9B9ED838'},
  profile_pic_container:{flex:1, borderRadius:20},
  profile_pic:{ width:100, height:100, resizeMode:'cover', borderRadius:20},
  profileHead:{display:'flex', flexDirection:'row',gap:20, alignItems:'center', justifyContent:'space-between'},
  match_me_container:{width:120, height:120, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:50, marginRight:20},
  match_me:{fontWeight:'bold'},
  profile_name:{fontWeight:'bold', fontSize:30, fontFamily:'jaro'},
  signs_grid:{},
  sun_flex:{display:'flex', flexDirection:'row', gap:5,justifyContent:'space-between'},
  profile_moon:{display:'flex', flexDirection:'row', padding:10, marginBlockStart:15, backgroundColor:'#9B9ED850',  borderRadius:20, gap:20, justifyContent:'center'},
  profile_sign:{flex:1, display:'flex', padding:10, marginBlockStart:15, backgroundColor:'#9B9ED850', borderRadius:20, alignItems:'center', justifyContent:'space-between', gap:5},
  moon_image:{width:75, height:75},
  sign_text_group:{ display:'flex', alignItems:'center', justifyContent:'center'},
  moon_title:{fontSize:30, fontWeight:'bold'},
  sign_title:{fontSize:24, fontWeight:'bold'},
  sign_text:{fontSize:18, color:'#8184BE'},
  asc_image:{width:75, height:35, marginTop:15},
  profile_bio:{marginBlockStart:20, padding:25, backgroundColor:'#9B9ED850', borderRadius:20},
  section_title:{marginBlockStart:20, fontWeight:'bold'},
  preference_title_container:{display:'flex', flexDirection:'row', gap:10, alignItems:'center'},
  preference_image:{width:'10%', height:'90%'},
  preference_title:{fontWeight:'bold'},
  preference_text:{marginBlockStart:10, marginTop:5},
  edit_icon:{height:20, width:20, alignSelf:'flex-end'}
})