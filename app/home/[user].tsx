import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { usePathname } from 'expo-router';
import React, {useEffect, useState} from 'react'
import { useAuth0 } from 'react-native-auth0';

const Profile_view = () => {

  const path = usePathname().split('/')[2];
  const {getCredentials} = useAuth0()
  const [profile, setProfile] = useState({
    name:"",
    picture_url:"",
    city:"",
    asc:"", 
    sun:"",
    moon:"",
    aboutMe:"",
    movies:[],
    music:[],
    books:[]
  })
  
  async function getUserDetails(id:string){
    const credentials = await getCredentials()
    try {
      const response = await fetch('https://moonlo-backend.onrender.com/api/users/'+id, {
        headers:{
          Authorization: 'Bearer '+ credentials?.accessToken
        }
      })
      const json = await response.json()
      setProfile(json)
        
    } catch (e){
      console.log("ERROR FROM API", e);
    }
  }

  useEffect(()=>{
    getUserDetails(path)
  },[])

return (
    <ScrollView style={styles.scroll}>
     {profile && <View style={styles.profile_head}>
      <Image src={profile?.picture_url} style={styles.profile_pic} />
      <View style={styles.head_details}>
        <Text style={styles.profile_name}>{profile?.name.split(" ")[0]}</Text>
        <Text style={styles.profile_city}>{profile?.city}</Text>
        <View style={styles.signs_row}>
          <View style={styles.profile_sign}>
            <Image source={require('../../assets/images/sun3d.png')} style={styles.moon_image} />
            <View style={styles.sign_text_group}>
              <Text style={styles.sign_title}>{profile?.sun}</Text>
            </View>
          </View>
          <View style={styles.profile_sign}>          
            <Image source={require('../../assets/images/asc3d.png')} style={styles.asc_image} />
            <View style={styles.sign_text_group}>
              <Text style={styles.sign_title}>{profile?.asc}</Text>
            </View>
          </View>


        </View>
       </View>
      
     </View>
     
     }
      <View style={styles.profile_moon}>
          <Image source={require('../../assets/images/moon3d.png')} style={styles.moon_image} />
          <View style={styles.sign_text_group}>
               <Text style={styles.moon_title}>{profile?.moon}</Text>
              <Text style={styles.sign_text}>moon</Text>
          </View>
      </View>

      <Text style={styles.section_title}>Bio</Text>
      <View style={styles.profile_bio}>
        <Text>{profile.aboutMe}</Text>
      </View>
      <Text style={styles.section_title}>Interests</Text>

     <View style={styles.profile_bio}>
               
               <View style={styles.preference_title_container}>
     
                 <Image style={styles.preference_image} source={require('../../assets/images/movies-icon.png')} />
                 <Text style={styles.preference_title}>movies</Text>
     
               </View>
               {
                 profile?.movies?.length>0 && profile.movies.map((movie:string) => (
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
                 profile?.books?.length>0 && profile.books.map((book:string) => (
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
                 profile?.music?.length>0 && profile.music.map((music:string) => (
                   <Text style={styles.preference_text} key={music}>• {music}</Text>                
                 ))
               } 
               </View>   
               <TouchableOpacity onPress={()=>{}} style={styles.request_message_button} >
                           <Text style={styles.request_message_text}>REQUEST MESSAGGE</Text>
                   
                             </TouchableOpacity>


    </ScrollView>
  )
}

export default Profile_view

const styles = StyleSheet.create({
  scroll:{backgroundColor:'#9B9ED838'},
  profile_head:{ marginBlockStart:20, display:'flex', flexDirection:'row', gap:10, justifyContent:'space-evenly'},
  profile_pic:{ width:'40%', height:'100%', resizeMode:'cover', borderRadius:20, alignSelf:'center'},
  profile_name:{textAlign:'center', fontSize:24, fontWeight:'bold'},
  head_details:{display:'flex', justifyContent:"center"},
  signs_row:{display:'flex', flexDirection:'row', gap:10},
  profile_sign:{ display:'flex', padding:10, marginBlockStart:15, backgroundColor:'#9B9ED850', borderRadius:20, alignItems:'center', justifyContent:'space-between', gap:5},
  sign_text_group:{display:'flex', alignItems:'center', justifyContent:'center'},
  sign_title:{fontSize:18,},
  sign_text:{fontSize:18, color:'#8184BE'},
  moon_image:{width:60, height:50},
  asc_image:{width:60, height:50},
  profile_city:{textAlign:'center'},
  profile_moon:{display:'flex', flexDirection:'row', padding:10, margin:15, backgroundColor:'#9B9ED850',  borderRadius:20, gap:20, justifyContent:'center'},
  moon_title:{fontSize:20, fontWeight:'bold'},
  section_title:{marginHorizontal:20, fontWeight:'bold'},
  profile_bio:{marginHorizontal:20, marginVertical:10, padding:25, backgroundColor:'#9B9ED850', borderRadius:20},
  preference_title_container:{display:'flex', flexDirection:'row', gap:10, alignItems:'center'},
  preference_image:{width:'10%', height:'90%'},
  preference_title:{fontWeight:'bold'},
  preference_text:{marginBlockStart:10, marginTop:5},
  request_message_button:{margin: 10, backgroundColor:'#7679B9', borderRadius:15, padding:15},
  request_message_text:{textAlign:'center', fontSize:18},

})