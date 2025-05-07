import { StyleSheet, Image, Text, View, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useProfile } from '../context/ProfileContext'
import { useRouter } from 'expo-router'
import ProfilePictureUploadScreen from '../components/pickImage'

const EditProfile = () => {
  const { profile, setProfile } = useProfile()
  const router = useRouter()
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || '')
  const [movies, setMovies] = useState(profile?.movies || [])
  const [books, setBooks] = useState(profile?.books || [])
  const [music, setMusic] = useState(profile?.music || [])
  const [newMovie, setNewMovie] = useState('')
  const [newBook, setNewBook] = useState('')
  const [newMusic, setNewMusic] = useState('')

  const handleImageUpdate = (base64Image: string) => {
    setProfile({ ...profile, picture_url: `data:image/jpeg;base64,${base64Image}` })
  }

  const handleSave = () => {
    setProfile({
      ...profile,
      aboutMe,
      movies,
      books,
      music,
    })
    router.back()
  }

  const addPreference = (type: 'movie' | 'book' | 'music', value: string) => {
    if (!value.trim()) return
    switch (type) {
      case 'movie':
        setMovies([...movies, value.trim()])
        setNewMovie('')
        break
      case 'book':
        setBooks([...books, value.trim()])
        setNewBook('')
        break
      case 'music':
        setMusic([...music, value.trim()])
        setNewMusic('')
        break
    }
  }

  const removePreference = (type: 'movie' | 'book' | 'music', index: number) => {
    switch (type) {
      case 'movie':
        setMovies(movies.filter((_: string, i: number) => i !== index))
        break
      case 'book':
        setBooks(books.filter((_: string, i: number) => i !== index))
        break
      case 'music':
        setMusic(music.filter((_: string, i: number) => i !== index))
        break
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Edit Profile</Text>
        <Pressable onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <ProfilePictureUploadScreen 
          updateImage={handleImageUpdate}
          onSubmit={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          value={aboutMe}
          onChangeText={setAboutMe}
          placeholder="Tell us about yourself..."
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Movies</Text>
        <View style={styles.preferenceInput}>
          <TextInput
            style={styles.input}
            value={newMovie}
            onChangeText={setNewMovie}
            placeholder="Add a movie"
          />
          <Pressable onPress={() => addPreference('movie', newMovie)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
        {movies.map((movie: string, index: number) => (
          <View key={index} style={styles.preferenceItem}>
            <Text>{movie}</Text>
            <Pressable onPress={() => removePreference('movie', index)}>
              <Text style={styles.removeButton}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Books</Text>
        <View style={styles.preferenceInput}>
          <TextInput
            style={styles.input}
            value={newBook}
            onChangeText={setNewBook}
            placeholder="Add a book"
          />
          <Pressable onPress={() => addPreference('book', newBook)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
        {books.map((book: string, index: number) => (
          <View key={index} style={styles.preferenceItem}>
            <Text>{book}</Text>
            <Pressable onPress={() => removePreference('book', index)}>
              <Text style={styles.removeButton}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Music</Text>
        <View style={styles.preferenceInput}>
          <TextInput
            style={styles.input}
            value={newMusic}
            onChangeText={setNewMusic}
            placeholder="Add music"
          />
          <Pressable onPress={() => addPreference('music', newMusic)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
        {music.map((item: string, index: number) => (
          <View key={index} style={styles.preferenceItem}>
            <Text>{item}</Text>
            <Pressable onPress={() => removePreference('music', index)}>
              <Text style={styles.removeButton}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B9ED838',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#8184BE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  saveButton: {
    fontSize: 16,
    color: '#8184BE',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#9B9ED850',
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  preferenceInput: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#8184BE',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  removeButton: {
    color: '#8184BE',
    fontSize: 20,
    fontWeight: 'bold',
  },
}) 