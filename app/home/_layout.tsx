import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = keyof typeof Ionicons.glyphMap; 

export default function HomeLayout() {
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
      />
    );
  }
