import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { usePathname } from 'expo-router';
import React, {useEffect, useState} from 'react'
import { useAuth0 } from 'react-native-auth0';
import { fetchWithTimeout } from '../utils/fetchWithTimeout';
import { useProfile } from '../context/ProfileContext';
import { analyzeAstrologicalCompatibility } from '../utils/openai';

const Profile_view = () => {
  const path = usePathname();
  const userId = path.split('/')[2]; // Get the user ID from the URL
  const {getCredentials} = useAuth0()
  const { profile: currentUserProfile } = useProfile();
  const [profile, setProfile] = useState({
    name:"",
    picture_url:"",
    city:"",
    asc:"", 
    sun:"",
    moon:"",
    aboutMe:"",
    movies:[],
    music:[],
    books:[]
  })
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  async function getUserDetails(id:string){
    if (!id) return; // Don't fetch if no ID
    const credentials = await getCredentials()
    try {
      const response = await fetchWithTimeout('https://moonlo-backend.onrender.com/api/users/'+id, {
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

  const handleAnalyzeMatch = async () => {
    setIsAnalyzing(true);
    try {
      const compatibilityAnalysis = await analyzeAstrologicalCompatibility(
        {
          sun: currentUserProfile.sun,
          moon: currentUserProfile.moon,
          asc: currentUserProfile.asc
        },
        {
          sun: profile.sun,
          moon: profile.moon,
          asc: profile.asc
        }
      );
      setAnalysis(compatibilityAnalysis);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Error analyzing match:", error);
      setAnalysis("Sorry, there was an error analyzing the compatibility. Please try again later.");
      setShowAnalysis(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset profile when userId changes
  useEffect(() => {
    setProfile({
      name:"",
      picture_url:"",
      city:"",
      asc:"", 
      sun:"",
      moon:"",
      aboutMe:"",
      movies:[],
      music:[],
      books:[]
    });
  }, [userId]);

  // Fetch new profile data when userId changes
  useEffect(() => {
    if (userId) {
      getUserDetails(userId);
    }
  }, [userId]);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.profile_head}>
        <Image source={{uri: profile?.picture_url}} style={styles.profile_pic} />
        <View style={styles.head_details}>
          <Text style={styles.profile_name}>{profile?.name?.split(" ")[0]}</Text>
          <Text style={styles.profile_city}>{profile?.city}</Text>
          <View style={styles.signs_row}>
            <View style={styles.profile_sign}>
              <Image source={require('../../assets/images/sun3d.png')} style={styles.moon_image} />
              <View style={styles.sign_text_group}>
                <Text style={styles.sign_title}>{profile?.sun}</Text>
              </View>
            </View>
            <View style={styles.profile_sign}>          
              <Image source={require('../../assets/images/asc3d.png')} style={styles.asc_image} />
              <View style={styles.sign_text_group}>
                <Text style={styles.sign_title}>{profile?.asc}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
     
      <View style={styles.profile_moon}>
        <Image source={require('../../assets/images/moon3d.png')} style={styles.moon_image} />
        <View style={styles.sign_text_group}>
          <Text style={styles.moon_title}>{profile?.moon}</Text>
          <Text style={styles.sign_text}>moon</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.analyzeButton} 
        onPress={handleAnalyzeMatch}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.analyzeButtonText}>ANALYZE MATCH</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={showAnalysis}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAnalysis(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Compatibility Analysis</Text>
            <ScrollView style={styles.analysisScroll}>
              <Text style={styles.analysisText}>{analysis}</Text>
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAnalysis(false)}
            >
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.section_title}>Bio</Text>
      <View style={styles.profile_bio}>
        <Text>{profile?.aboutMe}</Text>
      </View>
      
      <Text style={styles.section_title}>Interests</Text>

      <View style={styles.profile_bio}>
        <View style={styles.preference_title_container}>
          <Image style={styles.preference_image} source={require('../../assets/images/movies-icon.png')} />
          <Text style={styles.preference_title}>movies</Text>
        </View>
        {profile?.movies?.length > 0 && profile.movies.map((movie:string) => (
          <Text style={styles.preference_text} key={movie}>• {movie}</Text>                
        ))}
      </View>   
      
      <View style={styles.profile_bio}>
        <View style={styles.preference_title_container}>
          <Image style={styles.preference_image} source={require('../../assets/images/books-icon.png')} />
          <Text style={styles.preference_title}>books</Text>
        </View>
        {profile?.books?.length > 0 && profile.books.map((book:string) => (
          <Text style={styles.preference_text} key={book}>• {book}</Text>                
        ))}
      </View>
      
      <View style={styles.profile_bio}>
        <View style={styles.preference_title_container}>
          <Image style={styles.preference_image} source={require('../../assets/images/music-icon.png')} />
          <Text style={styles.preference_title}>music</Text>
        </View>
        {profile?.music?.length > 0 && profile.music.map((music:string) => (
          <Text style={styles.preference_text} key={music}>• {music}</Text>                
        ))}
      </View>   
    </ScrollView>
  )
}

export default Profile_view

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profile_head: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#BBBDDE50',
    alignItems: 'center'
  },
  profile_pic: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  head_details: {
    marginLeft: 20,
    flex: 1
  },
  profile_name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#161954'
  },
  profile_city: {
    fontSize: 16,
    color: '#666'
  },
  signs_row: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10
  },
  profile_sign: {
    flex: 1,
    backgroundColor: '#8184BE40',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center'
  },
  moon_image: {
    width: 30,
    height: 30
  },
  asc_image: {
    width: 30,
    height: 30
  },
  sign_text_group: {
    alignItems: 'center',
    marginTop: 5
  },
  sign_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161954'
  },
  profile_moon: {
    backgroundColor: '#8184BE40',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    alignItems: 'center'
  },
  moon_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161954'
  },
  sign_text: {
    fontSize: 14,
    color: '#666'
  },
  section_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161954',
    marginLeft: 20,
    marginTop: 20
  },
  profile_bio: {
    backgroundColor: '#BBBDDE50',
    margin: 20,
    padding: 15,
    borderRadius: 15
  },
  preference_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  preference_image: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  preference_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161954'
  },
  preference_text: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10
  },
  analyzeButton: {
    backgroundColor: '#8184BE',
    padding: 15,
    borderRadius: 15,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#161954',
    marginBottom: 15,
    textAlign: 'center'
  },
  analysisScroll: {
    maxHeight: '70%'
  },
  analysisText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24
  },
  closeButton: {
    backgroundColor: '#8184BE',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})