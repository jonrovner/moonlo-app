import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'
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
              <Image source={{uri: user.picture_url}}  style={styles.profile_pic}/>
    
              <View style={styles.details_container}>
                  <Text style={styles.picture_title}>{user.name.split(" ")[0]}</Text>
                  <Text>📍 {user.city}</Text>
    
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
              
              <View style={styles.buttons_row}>
              
                <TouchableOpacity onPress={()=>onProfileView(user.auth0_id)} style={styles.see_profile_button}>
                  <Text style={styles.see_profile_text}>SEE PROFILE</Text>
                </TouchableOpacity>
                <Image style={styles.pink_heart} source={require('../../assets/images/pink-heart.png')}/>
           
           
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
  user_profile_container:{backgroundColor:'#BBBDDE50', margin:10, padding:10, borderRadius:10},
  profile_pic:{flex:1, borderRadius:20},
  picture_group:{display:'flex', flexDirection:'row', padding:2, gap:15, justifyContent:'center'},
  details_container:{flex:1, display:'flex', gap:20, justifyContent:'flex-start', alignItems:'center'},
  picture_title:{fontSize:24, fontWeight:'bold'},
  signs_container:{display:'flex', flexDirection:'row', gap:10},
  sign:{flex:1, backgroundColor:'#8184BE40', display:'flex', padding:10, justifyContent:'center', borderRadius:15},
  sign_image:{width:30, height:30},
  buttons_row:{marginBlockStart: 10, display:'flex', flexDirection:'row', justifyContent:'space-between'},
  see_profile_button:{paddingBlockStart:15, paddingHorizontal:25, backgroundColor:'#161954', borderRadius:15},
  see_profile_text:{color:'white'},
  pink_heart:{height:50, alignSelf:'center'},
  request_message_button:{marginBlockStart: 10, backgroundColor:'#7679B9', borderRadius:15, padding:15},
  request_message_text:{textAlign:'center', fontSize:18},
  filter_icon:{marginBlockEnd:10}
})