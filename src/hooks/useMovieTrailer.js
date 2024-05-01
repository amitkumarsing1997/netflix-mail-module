import { useEffect } from "react";
import { API_OPTIONS,MOVIE_TRAILER,VIDEOS_LANGUAGE } from "../utils/constants";
import { useDispatch} from "react-redux";
import { addTrailerVideo} from "../utils/moviesSlice";
import { useSelector } from 'react-redux'
const useMovieTrailer = (movieId) =>{

 

    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo)
    // (but when we use redux store than we should use the power of redux store)
    //now I don't want to my component manage their own state, let us keep the trailer in redux store and fetch it
    // from there
   

    // fetch trailer video and updating the store with trailer video data
    const getMovieVideos = async () => {
        const data = await fetch(MOVIE_TRAILER+
        movieId+
        VIDEOS_LANGUAGE, 
        API_OPTIONS)

        const json = await data.json()
        const filterData = json.results.filter( video => video.type === "Trailer" )
        const trailer = filterData.length ? filterData[0] : json.results[0]
        dispatch(addTrailerVideo(trailer)) 
    };
   
    useEffect(() => {
      !trailerVideo && getMovieVideos();
    },[]);
    

}

export default useMovieTrailer