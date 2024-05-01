import { useEffect } from "react";
import { API_OPTIONS,NOW_PLAYING_MOVIES } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice"
import { useSelector } from 'react-redux'

const useNowPlayingMovies = () => {

     // Fetch Data from TMDB API and update store
     const dispatch = useDispatch()
     const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)
     const getNowPlayingMovies = async () => {
        //  const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",
        //  API_OPTIONS
        //  );

         const data = await fetch(NOW_PLAYING_MOVIES,
         API_OPTIONS
         );
         const json = await data.json()
         dispatch(addNowPlayingMovies(json.results))
     };
 
     useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies()
     },[])
   
}
export default useNowPlayingMovies