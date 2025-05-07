const TMDB_API_KEY = "453d1bffb0f33c4c6bb80d7b67a47709"; // Replace with your actual API key
import { fetchWithTimeout } from './utils/fetchWithTimeout';
    
export async function fetchMovies (query) {
      const words = query.trim().split(/\s+/); // Split query into words

      // Don't search if there are no words
      if (words.length === 0) return [];

      // If the first word is "The", wait for a second word
      if (words[0].toLowerCase() === "the" && words.length < 2) return [];

      try {
        const response = await fetchWithTimeout(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`
        );
    
        const data = await response.json();
        //console.log('data', data.results.map(r => r.title));
        
        if (!data.results) return [];
    
        // Map and sort the results by year (newest first)
        return data.results
          .map((movie) =>  movie.title
            //year: movie.release_date ? movie.release_date.split("-")[0] : "Unknown",
          )
          //.sort((a, b) => (b.year === "Unknown" ? -1 : parseInt(b.year) - parseInt(a.year)));
      } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
      }
};

export async function fetchBooks (query) {
 
    return [];
 
};

export async function fetchMusic (query) {
  return []
  /* if (!query) return [];

  try {
    const response = await fetchWithTimeout(`https://api.deezer.com/search?q=artist:${encodeURIComponent(query)}`);
    
    console.log('response: ', response);
    
    const data = await response.json();

    return data.data
      ? data.data.map((item) => item.artist.name)
      : [];
  } catch (error) {
    console.error("Error fetching music:", error);
    return [];
  } */
};


  
    
    
export default {fetchMovies, fetchBooks, fetchMusic}