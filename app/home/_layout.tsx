import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0'
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'; 
import { ProfileProvider, useProfile } from '../context/ProfileContext';
import * as SplashScreen from 'expo-splash-screen'; 

SplashScreen.preventAutoHideAsync();

type IoniconsName = keyof typeof Ionicons.glyphMap;

export default function HomeLayout() {
  return (
    <ProfileProvider>
      <HomeTabs />
    </ProfileProvider>
  );
}

function HomeTabs() {

  const [loaded, error] = useFonts({
    'Jaro': require('../../assets/fonts/Jaro-Regular-VariableFont_opsz.ttf'),
    'work': require('../../assets/fonts/WorkSans-VariableFont_wght.ttf')
  });

  useEffect(() => {
     if (loaded || error) {
       SplashScreen.hideAsync();
     }
   }, [loaded, error]);
  
   if (!loaded && !error) {
     return null;
   }

  const { authorize, user, getCredentials, isLoading } = useAuth0();
  const {profile, setProfile} = useProfile();

  async function checkSession() {
    if (!user){
      try {
        await authorize({audience:"https://moonlo-api"});
        await getCredentials();
      } catch (e) {
        console.log('Authentication error:', e);
      }
      } 
  }

  async function fetchProfile(user:any){
    let id = encodeURIComponent(user.sub)
    const credentials = await getCredentials()
    if (!credentials?.accessToken){
      await checkSession()
    }
    try {
      const response = await fetch('http://192.168.0.76:3001/api/users/'+id, {
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

  useEffect(() => {
    checkSession();
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchProfile(user);
    } else {
      setProfile({});
    }
  }, [user]);

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

      <Tabs.Screen
         name="search"
         options={{
          href: {
            pathname: '/home/search',
            params: {
             ...profile
            },
          }
        }}
        //initialParams={{profile}}
      />
      <Tabs.Screen
         name="profile"
         options={{
          href: {
            pathname: '/home/profile',
            params: {
             ...profile
            },
          }
        }}
        //initialParams={{profile}}
      />
    </Tabs>
   
    );
  }
