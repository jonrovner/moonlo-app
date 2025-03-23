import { StyleSheet, Text, View } from 'react-native'
import { usePathname } from 'expo-router';
import React from 'react'

const Profile_view = () => {

  const path = usePathname();
  console.log("path: ", path);
  
  //const { auth0_id } = router.query;
  return (
    <View>
      <Text>{path}</Text>
    </View>
  )
}

export default Profile_view

const styles = StyleSheet.create({})