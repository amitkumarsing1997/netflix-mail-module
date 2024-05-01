import { useEffect } from "react";
import { API_OPTIONS,MOVIE_TRAILER,VIDEOS_LANGUAGE } from "../utils/constants";
import { useDispatch} from "react-redux";
import { addTrailerVideo2 } from "../utils/moviesSlice";
// import { useSelector } from 'react-redux'
const useMovieTrailer2 = (movieId) =>{

    const dispatch = useDispatch();
    // const trailerVideo2 = useSelector(store => store.movies.trailerVideo2)

    // fetch trailer video and updating the store with trailer video data
    const getMovieVideos = async () => {
        // const data = await fetch("https://api.themoviedb.org/3/movie/"+
        //  movieId+
        //  "/videos?language=en-US", 
        // API_OPTIONS)

        const data = await fetch(MOVIE_TRAILER+
        movieId+
        VIDEOS_LANGUAGE, 
       API_OPTIONS)

        const json = await data.json()
        const filterData = json.results.filter( video => video.type === "Trailer" )
        const trailer = filterData.length ? filterData[0] : json.results[0]
        console.log("trailer----")
        console.log(trailer)
        dispatch(addTrailerVideo2(trailer))
       
    };

    useEffect(() => {
      getMovieVideos();
    },[]);

}

export default useMovieTrailer2