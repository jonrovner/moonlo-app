import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { router } from 'expo-router';
import { fetchWithTimeout } from '../utils/fetchWithTimeout'

interface Props {
    faved:boolean
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

const ListedProfile: React.FC<Props>  = ({user, me, faved}) => {

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

  const onAddToFavs = async () =>{
    let myId = encodeURIComponent(me.auth0_id)

    try{
      let response = await fetchWithTimeout('http://192.168.0.76:3001/api/users/'+myId+"/favs", {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id:user.auth0_id})
      })
      let json = await response.json()
      console.log("json : ", json);
      if (json.message){
        faved = true
      }
    }catch(e){
      console.log("ERROR ADDING TO FAV ", e);
    }
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
                {

                  !faved && 
                <Pressable onPress={onAddToFavs}>
                <Image style={styles.pink_heart} source={require('../../assets/images/pink-heart.png')}/>
                <Text>Add to Favs</Text>
                </Pressable>

                }
                {
                  faved &&<Image style={styles.pink_heart} source={require('../../assets/images/blueheart.png')}/>
                }
           
              </View>
              <TouchableOpacity onPress={onRequestMessage} style={styles.request_message_button} >
            <Text style={styles.request_message_text}>REQUEST MESSAGGE</Text>
    
              </TouchableOpacity>
           
           </View> 
  )
}

export default ListedProfile

const styles = StyleSheet.create({
  background_image: {
    width: '100%',
    height: '100%',
  },
  title_bar: {
    backgroundColor: '#BBBDDE50',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title_image: {
    height: 70,
    width: 70
  },
  title_text: {
    fontSize: 24
  },
  user_profile_container: {
    backgroundColor: '#BBBDDE50',
    margin: 10,
    padding: 15,
    borderRadius: 15
  },
  profile_pic: {
    width: 100,
    height: 100,
    borderRadius: 20
  },
  picture_group: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  details_container: {
    flex: 1,
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picture_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161954'
  },
  signs_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '100%'
  },
  sign: {
    flex: 1,
    backgroundColor: '#8184BE40',
    display: 'flex',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  sign_image: {
    width: 30,
    height: 30
  },
  buttons_row: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  see_profile_text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pink_heart: {
    width: 50,
    height: 50
  },
  see_profile_button: {
    flex: 3,
    padding: 12,
    backgroundColor: '#161954',
    borderRadius: 15
  },
  request_message_button: {
    marginTop: 10,
    backgroundColor: '#7679B9',
    borderRadius: 15,
    padding: 12
  },
  request_message_text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  filter_icon: {
    marginBottom: 10
  }
})