import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { router } from 'expo-router';

interface Props {
   
    user:{
        auth0_id:string,
        picture_url:string,
        name:string,
        city:string,
        sun:string,
        asc:string,
        email:string
    },
    me:{
      auth0_id:string,
      picture_url:string,
      name:string,
      email:string
    }
}

const ListedProfile: React.FC<Props>  = ({user, me}) => {

  const onProfileView = (id:string) => {
    router.navigate(`/home/${id}`)
  }

  const onRequestMessage = () => {

    const query = new URLSearchParams({
      myId:me.auth0_id,
      myName:me.name,
      myPic: me.picture_url,
      myEmai: me.email,
      otherId: user.auth0_id,
      otherName: user.name,
      otherPic: user.picture_url,
      otherEmail:user.email
    })

    router.navigate(`/chat?${query.toString()}`)
  }

  

  return (
    <View key={user.auth0_id} style={styles.user_profile_container}>
            
            <View style={styles.picture_group}>
                <Text style={styles.picture_title}>{user.name.split(" ")[0]}</Text>
                <Image source={{uri: user.picture_url}}  style={styles.profile_pic}/>
            </View>
              
             <View style={styles.buttons_row}>
              
                <TouchableOpacity onPress={()=>onProfileView(user.auth0_id)} style={styles.see_profile_button}>
                  <Text style={styles.see_profile_text}>SEE PROFILE</Text>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity onPress={onRequestMessage} style={styles.request_message_button} >
               <Text style={styles.request_message_text}>REQUEST MESSAGGE</Text>
    
              
            </TouchableOpacity>
           
    </View> 
  )
}

export default ListedProfile

const styles = StyleSheet.create({
  background_image:{width:'100%', height:'100%', },
  title_bar:{backgroundColor:'#BBBDDE50', height:100, display:'flex', flexDirection:'row', padding:10, justifyContent:'space-between', alignItems:'center'},
  title_image:{height:70, width:70},
  title_text:{fontSize:24},
  
  user_profile_container:{display:'flex', backgroundColor:'#BAB5D870', margin:10, padding:10, borderRadius:10, gap:10},
  
  picture_group:{display:'flex', padding:2, gap:15, justifyContent:'center', alignItems:'center'},
  picture_title:{ fontSize:36, fontWeight:'bold'},
  profile_pic:{height:200, width:200, borderRadius:20},
  
  see_profile_button:{marginHorizontal:20, flex:1, padding:15, backgroundColor:'#161954', borderRadius:15},
  see_profile_text:{color:'white', textAlign:'center'},
  
  buttons_row:{marginBlockStart: 10, display:'flex', flexDirection:'row', justifyContent:'space-between', gap:20},
  
  request_message_button:{marginHorizontal:20, backgroundColor:'#7679B9', borderRadius:15, padding:15},
  request_message_text:{textAlign:'center', fontSize:18},
  filter_icon:{marginBlockEnd:10}
})