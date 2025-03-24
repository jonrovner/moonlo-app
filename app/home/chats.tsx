import React, {useRef, useEffect} from 'react';
import * as TalkRn from '@talkjs/expo';

import { StyleSheet, Text, View } from 'react-native'



function ChatComponent() {
  const me = {
    id: '123456789',
    name: 'Alice',
    email: 'alice@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
    welcomeMessage: 'Hey there! How are you? :-)',
  };

  const other = {
    id: '987654321',
    name: 'Sebastian',
    email: 'Sebastian@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
    welcomeMessage: 'Hola',
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
      onBlur={(event) => console.log('onBlur: ', event)}
      onFocus={(event) => console.log('onFocus: ', event)}
      onSendMessage={(event) => console.log('onSendMessage: ', event)} />
    </TalkRn.Session>
  );
}

const Chats = () => {

  
  return (
    <View style={styles.chat_container}>
      <Text>Chats</Text>
      <ChatComponent />
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  chat_container:{
    width:'100%',
    height:'100%'
  }
})