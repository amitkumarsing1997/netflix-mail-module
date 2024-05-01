import { useEffect } from "react";
import { API_OPTIONS,UPCOMING_MOVIES } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/moviesSlice"
import { useSelector } from 'react-redux'

const useUpComingMovies = () => {

     // Fetch Data from TMDB API and update store
     const dispatch = useDispatch()
     const upComingMovies = useSelector(store => store.movies.upComingMovies)

     const getUpComingMovies = async () => {
         const data = await fetch(UPCOMING_MOVIES,
         API_OPTIONS
         );
         const json = await data.json()
         dispatch(addUpComingMovies(json.results))
     };
 
     useEffect(() => {
        !upComingMovies && getUpComingMovies()
     },[])
}
export default useUpComingMovies