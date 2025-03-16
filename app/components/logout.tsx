

import { Text, Pressable, View, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';


const Logout = () => {
   
    const {clearSession} = useAuth0();

  
    const handleLogout = async () => {
      try {
     
        await clearSession();
        router.push('/')
     
        
      } catch (error) {
        console.error('Logout failed', error);
        Alert.alert('Error', 'Logout failed. Please try again.');
      }
    };
  
    return (
      <View>
        <Pressable onPress={handleLogout} style={styles.button}>
            <Text style={styles.logout}>Log out</Text>

        </Pressable>
        
      </View>
    );
  };
  const styles = StyleSheet.create({
        button:{width:'30%', alignSelf:'center'},
        logout:{
            borderRadius:10,
            padding:20,
            backgroundColor:'#8184BE50',
            color:'#161954',
            fontWeight:'bold'
        }

})
  export default Logout;
