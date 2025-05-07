import React, {useRef, useEffect, useState} from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import Waiting from '../components/waiting';
import { useAuth0 } from 'react-native-auth0';
import { fetchWithTimeout } from '../utils/fetchWithTimeout';
import * as TalkRn from '@talkjs/expo';
import { StyleSheet, Text, View } from 'react-native'

const Chats = () => {
  const user = useLocalSearchParams();
  const { getCredentials } = useAuth0();
  const [error, setError] = useState<string | null>(null);

  const tokenFetcher = async () => {
    try {
      const credentials = await getCredentials();
      const response = await fetchWithTimeout('https://moonlo-backend.onrender.com/api/talkjs/token', {
        headers: {
          Authorization: `Bearer ${credentials?.accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch Talk.js token');
      }
      
      const data = await response.json();
      return data.token;
    } catch (err) {
      console.error('Error fetching Talk.js token:', err);
      setError('Failed to initialize chat. Please try again later.');
      throw err;
    }
  };

  if (error) {
    return (
      <View style={styles.chat_container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.chat_container}>
      <TalkRn.Session 
        appId="tsCGxV3Q" 
        me={{
          id: String(user.auth0_id), 
          name: String(user.name), 
          photoUrl: String(user.picture_url),             
        }}
        tokenFetcher={tokenFetcher}
      >
        <TalkRn.ConversationList 
          loadingComponent={<Waiting/>}
        />
      </TalkRn.Session>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  chat_container:{
    width:'100%',
    height:'100%',
    marginBlockStart:20
  },
  conversation_list:{
    width:'100%'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  }
})