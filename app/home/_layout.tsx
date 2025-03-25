import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0'
import { useEffect, useState } from 'react';

type IoniconsName = keyof typeof Ionicons.glyphMap;

export default function HomeLayout() {

  const { authorize, user, error, getCredentials, isLoading } = useAuth0();
  const [profile, setProfile] = useState({})
  useEffect(()=>{console.log("user in profile", user);
  }, [])

  async function checkSession() {
      if (!user){
        console.log("no user");
        
        try {
          await authorize();
          await getCredentials();
        
         
        } catch (e) {
          console.log('Authentication error:', e);
        }
      }
    }

    async function fetchProfile(user:any){
      let id = encodeURIComponent(user.sub)
      try{
      const response = await fetch('http://192.168.0.76:3001/api/users/'+id)
      const json = await response.json()
        //console.log("I GOT PROFILE", json);
      setProfile(json)
      
  
      } catch (e){
        console.log("ERROR FROM API", e);
      }
    }

    useEffect(()=>{
      checkSession()
      fetchProfile(user)
      console.log("user in layout", user);
    },[])


    return (
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: IoniconsName = "person";
            
            if (route.name === 'profile') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'search') iconName = focused ? 'search' : 'search-outline';
            else if (route.name === 'favs') iconName = focused ? 'heart' : 'heart-outline';
            else if (route.name === 'chats') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, 
        })}
      >
        <Tabs.Screen
        name="[user]"
        options={{
          href: null,
          tabBarShowLabel:false
         
        }}
      />
         <Tabs.Screen
        name="chats"
        options={{
          href: {
            pathname: '/home/chats',
            params: {
             ...profile
            },
          }
        }}
      />
      </Tabs>
      
    );
  }
