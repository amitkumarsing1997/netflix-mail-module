
import { API_OPTIONS,SEARCH_MOVIE_TMDB,ADULT_LANGUAGE_PAGE } from "../utils/constants";


    // fetch trailer video and updating the store with trailer video 
    
    const useSearchMoviewTMDB = async (movie) => {
        // const data = await fetch(
        //   "https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", 
        //   API_OPTIONS);  
          
          const data = await fetch(
            SEARCH_MOVIE_TMDB+movie+ADULT_LANGUAGE_PAGE, 
            API_OPTIONS);   
        const json = await data.json()
        console.log("json data----")
        console.log(json)
      
      }

export default useSearchMoviewTMDB