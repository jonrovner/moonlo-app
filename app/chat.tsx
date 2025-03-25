import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as TalkRn from '@talkjs/expo';

const Chat = () => {

    const {
        myId, 
        myName, 
        myPic, 
        myEmail,
        otherId, 
        otherName, 
        otherPic,
        otherEmail} = useLocalSearchParams<{
            myId:string;
            myName:string;
            myPic:string; 
            myEmail:string;
            otherId:string;
            otherName:string;
            otherPic:string;
            otherEmail:string
        }>()

        console.log("query  ", otherId);
        

        const me = {
            id: myId,
            name: myName,
            email: myEmail,
            photoUrl: myPic,
            welcomeMessage: 'Hey there!',
          };
        
          const other = {
            id: otherId,
            name: otherName,
            email: otherEmail,
            photoUrl: otherPic,
            welcomeMessage: 'Hi there',
          };

          const conversationBuilder = TalkRn.getConversationBuilder(
              TalkRn.oneOnOneId(me, other)
            );
          
            conversationBuilder.setParticipant(me);
            conversationBuilder.setParticipant(other);
          


  return (
      <TalkRn.Session appId="tsCGxV3Q" me={me}>
        <TalkRn.Chatbox 
        conversationBuilder={conversationBuilder}
        messageField={{
          enterSendsMessage: false,
          placeholder: 'Type a message'
        }}
        highlightedWords={['me', 'you']}
       
        onSendMessage={(event) => console.log('onSendMessage: ', event)} />
      </TalkRn.Session>
    );
}

export default Chat

const styles = StyleSheet.create({chat_container:{
    width:'100%',
    height:'100%'
  }})