import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

interface User {
  auth0_id: string
  name: string
  email: string
  location: { latitude: string, longitude: string }
  city: string
  movies: string[]
  books: string[]
  music: string[]
  yearOfBirth: string
  aboutMe: string
  gender: string
  lookingFor: string
  smoking: boolean
  drink: boolean
  kids: boolean
  minAge: string
  maxAge: string
  sun: string
  moon: string
  asc: string
}

const Search = () => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.0.3:3001/api/users')
      const json: User[] = await response.json()
      setUsers(json)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <View>
      <Text>Search</Text>
      {users.length > 0 && users.map(user => (
        <Text key={user.auth0_id}>{user.name}</Text>
      ))}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})
