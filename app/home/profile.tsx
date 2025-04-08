import { StyleSheet, Image, Text, View, ImageBackground, ScrollView, Pressable} from 'react-native'
import React, {useState, useEffect}from 'react'
import { useAuth0 } from 'react-native-auth0'
import Logout from '../components/logout'
import Waiting from '../components/waiting'
import { useRouter } from 'expo-router';
import { useProfile  } from '../context/ProfileContext'
const edit = require('../../assets/images/edit.png'); 

const Profile = () => {

  const [waiting, setWaiting] = useState<boolean>(true)
  const { profile, setProfile } = useProfile();
  const router = useRouter();
  const { user } = useAuth0();
  
  useEffect(()=> {
    if(profile.auth0_id){
      setWaiting(false) 
    }
  },[profile])
  
  return (
    <> 
     {waiting && <Waiting />}
      <ScrollView style={styles.scroll}>
    
        <View style={styles.profileHead}>
          <View style={styles.picture_group}>
              {user && profile?.picture_url && (
              <View style={styles.profile_pic_container}>
                <Image source={{uri: profile.picture_url}} style={styles.profile_pic} />
              </View>
              )}
              {user && profile?.name && <Text style={styles.profile_name}>{profile.name.split(" ")[0]}</Text>}
          </View>
          <View style={styles.match_me_container}>
            <Image source={edit} style={styles.edit_icon}/>
            <Pressable onPress={()=> {router.navigate('./search')}} >
               <ImageBackground
                source={require('../../assets/images/heart-baloon.png')}
                style={styles.background_image}
                resizeMode="cover"
               >
                 <Text style={styles.match_me}>MATCH ME</Text>
               </ImageBackground>
            </Pressable>
          </View>
        </View>
          
        {
            profile?.moon && (
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
           ) 
          }
          
        
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
        
     
      <Logout />
    </ScrollView> 
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  
  scroll:{backgroundColor:'#9B9ED838', padding:20},
  profileHead:{marginTop:30, marginBottom:20, height:'10%', display:'flex', flexDirection:'row', gap:30, alignItems:'center', justifyContent:'space-between'},
  picture_group:{flex:1, padding:5, backgroundColor:'#8184BE50', borderRadius:20, display:'flex', alignItems:'center'},
  title:{fontSize: 24 },
  background_image:{flex:1, display:'flex', justifyContent:'flex-end'},
  profile_pic_container:{flex:1, borderRadius:20},
  profile_pic:{ width:100, height:100, resizeMode:'cover', borderRadius:20},
  match_me_container:{flex:1, display:'flex', alignItems:'center', justifyContent:'flex-start', borderRadius:50, marginRight:20, gap:10},
  match_me:{fontWeight:'bold', alignSelf:'flex-end'},
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