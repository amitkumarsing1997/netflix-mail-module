import { useEffect } from "react";
import { API_OPTIONS,TOP_RATED_MOVIES } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice"
import { useSelector } from 'react-redux'

const useTopRatedMovies = () => {

     // Fetch Data from TMDB API and update store
     const dispatch = useDispatch()
     const topRatedMovies = useSelector(store => store.movies.topRatedMovies)

     const getTopRatedMovies = async () => {
        //  const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1",
        //  API_OPTIONS
        //  );
         const data = await fetch(TOP_RATED_MOVIES,
         API_OPTIONS
         );
         const json = await data.json()
         dispatch(addTopRatedMovies(json.results))
     };
 
     useEffect(() => {
        !topRatedMovies && getTopRatedMovies()
     },[])
   
}
export default useTopRatedMovies