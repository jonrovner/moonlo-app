import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen'; 
import {useEffect} from 'react';
import { Stack } from "expo-router";
import { Auth0Provider } from 'react-native-auth0';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

 const [loaded, error] = useFonts({
   'Jaro': require('../assets/fonts/Jaro-Regular-VariableFont_opsz.ttf'),
   'work': require('../assets/fonts/WorkSans-VariableFont_wght.ttf')
 });

 useEffect(() => {
   if (loaded || error) {
     SplashScreen.hideAsync();
   }
 }, [loaded, error]);

 if (!loaded && !error) {
   return null;
 }

  return <Auth0Provider 
   domain="moonlo.us.auth0.com"
   clientId="GcvUidg12Ix9t553pFYlcDKPM7EVYQp3"
   >

      <Stack
      screenOptions={{
        headerShown: false,
      }}/>
      
  </Auth0Provider>

 
}








/*

export default function RootLayout() {
  return <Stack
  screenOptions={{
    headerShown: false,
  }}
  
  />;
}
 */