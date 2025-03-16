import { StyleSheet, Image, Text, View, ImageBackground, ScrollView} from 'react-native'
import React, {useState, useEffect}from 'react'
import { useAuth0 } from 'react-native-auth0'

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
  lookingFor:string
  smoking:boolean
  drink:boolean
  kids:boolean
  minAge:string
  maxAge:string
  sun:string
  moon:string
  asc:string
}

const profile = () => {

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
    lookingFor: "",
    smoking: false,
    drink: false,
    kids: false,
    minAge: "",
    maxAge: "",
    sun: "",
    moon: "",
    asc: ""
});

  
  const { authorize, user, error, getCredentials, isLoading } = useAuth0();
  //console.log("user: ", user);
  
  async function fetchProfile(user:any){
    let id = encodeURIComponent(user.sub)
    try{
    const response = await fetch('http://192.168.0.3:3001/api/users/'+id)
    const json = await response.json()
      //console.log("I GOT PROFILE", json);
      
    setProfile(json)

    } catch (e){
      console.log("ERROR FROM API", e);
      
    }
    
  }
  
  async function checkSession() {
    if (!user){
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

  
  return (
    <ImageBackground
           source={require('../../assets/images/background.png')}
           style={styles.background_image}
           resizeMode="cover"
          > 
     <ScrollView style={styles.scroll}>
      
      <View style={styles.container}>
        <View style={styles.profileHead}>
          <View style={styles.picture_group}>
              {user &&  (
              <View style={styles.profile_pic_container}>
                <Image source={{uri: user.picture}} style={styles.profile_pic} />
              </View>
              )}
              {profile && <Text style={styles.profile_name}>{profile.name.split(" ")[0]}</Text>}
          </View>
          <View style={styles.match_me_container}>
            <Text style={styles.match_me}>MATCH ME</Text>
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
                <Text style={styles.sign_title}>Capricorn</Text>
                <Text style={styles.sign_text}>asc</Text>
              </View>


            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  )
}

export default profile

const styles = StyleSheet.create({
  container:{padding:30},
  picture_group:{width:'45%',padding:20, marginBlockStart:10, backgroundColor:'#9B9ED850', borderRadius:20, display:'flex', alignItems:'center', gap:16},
  title:{fontSize: 24 },
  background_image:{width:'100%', height:'100%'},
  scroll:{height:'100%'},
  profile_pic_container:{overflow:'hidden', width:80, height:80, borderRadius:40},
  profile_pic:{width:80, height:80, resizeMode:'cover'},
  profileHead:{display:'flex', flexDirection:'row',gap:20, alignItems:'center', justifyContent:'space-between'},
  match_me_container:{width:100, height:100, backgroundColor:'#9B9ED8', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:50, marginRight:20},
  match_me:{fontWeight:'bold'},
  profile_name:{fontWeight:'bold', fontSize:20},
  signs_grid:{},
  sun_flex:{display:'flex', flexDirection:'row', gap:5,justifyContent:'space-between'},
  profile_moon:{display:'flex', flexDirection:'row', padding:10, marginBlockStart:15, backgroundColor:'#9B9ED850',  borderRadius:20, gap:20, justifyContent:'center'},
  profile_sign:{flex:1, display:'flex', padding:10, marginBlockStart:15, backgroundColor:'#9B9ED850', borderRadius:20, alignItems:'center', justifyContent:'space-between', gap:5},
  moon_image:{width:75, height:75},
  sign_text_group:{ display:'flex', alignItems:'center', justifyContent:'center'},
  moon_title:{fontSize:30, fontWeight:'bold'},
  sign_title:{fontSize:24, fontWeight:'bold'},
  sign_text:{fontSize:18, color:'#8184BE'},
  asc_image:{width:75, height:35, marginTop:15}
  

})