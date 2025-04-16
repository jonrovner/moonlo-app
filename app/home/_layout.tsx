import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0'
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'; 
import { ProfileProvider, useProfile } from '../context/ProfileContext';
import * as SplashScreen from 'expo-splash-screen'; 
import { ErrorDisplay } from '../components/ErrorDisplay';
import { View } from 'react-native';
import { fetchWithTimeout } from '../utils/fetchWithTimeout';
import Waiting from '../components/waiting';

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
  const [authError, setAuthError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const { authorize, user, getCredentials, isLoading: auth0IsLoading } = useAuth0();
  const {profile, setProfile} = useProfile();

  async function checkSession() {
    if (!user){
      try {
        await authorize({audience:"https://moonlo-api"});
        await getCredentials();
        setAuthError(null);
      } catch (e) {
        console.log('Authentication error:', e);
        setAuthError('Failed to authenticate. Please try again.');
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
      const response = await fetchWithTimeout('https://moonlo-backend.onrender.com/api/users/'+id, {
        headers:{
          Authorization: 'Bearer '+ credentials?.accessToken
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const json = await response.json()
      setProfile(json)
      setProfileError(null);
      setIsLoading(false);
    } catch (e){
      console.log("ERROR FROM API", e);
      setProfileError('Failed to load profile. Please try again.');
      setIsLoading(false);
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

  if (isLoading) {
    return <Waiting />;
  }

  if (authError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ErrorDisplay 
          message={authError}
          onRetry={checkSession}
          type="error"
        />
      </View>
    );
  }

  if (profileError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ErrorDisplay 
          message={profileError}
          onRetry={() => user && fetchProfile(user)}
          type="error"
        />
      </View>
    );
  }

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
      />
    </Tabs>
  );
}
