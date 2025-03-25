import React, {useRef, useEffect, useState} from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import Waiting from '../components/waiting';

import * as TalkRn from '@talkjs/expo';

import { StyleSheet, Text, View } from 'react-native'


const Chats = () => {

  const user = useLocalSearchParams()
  console.log("user in chats: ", user);
  

  return (
    <View style={styles.chat_container}>
      <TalkRn.Session appId="tsCGxV3Q" me={{
          id: String(user.auth0_id), 
            name: String(user.name), 
            photoUrl: String(user.picture_url),             
          }}>
        <TalkRn.ConversationList />
      </TalkRn.Session>
      
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  chat_container:{
    width:'100%',
    height:'100%'
  },
  conversation_list:{
    width:'100%'
  }
})