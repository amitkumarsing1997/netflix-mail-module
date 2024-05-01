import {useSelector, useDispatch} from "react-redux";
import useMovieTrailer2 from "../hooks/useMovieTrailer2";
import {useParams} from "react-router-dom" 
import { useEffect, useState } from "react";
// import {addUser, removeUser} from "../utils/userSlice"
import {removeTrailerVideo2} from "../utils/moviesSlice"
import Error from "./Error"
// import Shimmer from "./Shimmer";
import LoadinSpinner from "./LoadinSpinner"

import Login from "./Login";
import {addLoggedInUser} from "../utils/loginStateSlice"
import {YOUTUBE_URL,AUTO_PLAY_MUTE} from "../utils/constants"


const VideoPlayOnSelectingCard = () => {

    const {movieId} = useParams();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [showError, setShowError] = useState(false)

    // const { loggedInUser } = useContext(UserContext)

    // console.log("Leran Usecontext")
    // console.log(loggedInUser)
    // if (loggedInUser){
    //     return
    // }

    // loggedInUser?<Login/>:(


    

    // learn the difference of directly used dispatch and 
    // by using useEffect

    // dispatch(removeTrailerVideo2())
    
     
     
    useEffect(() => {
       dispatch(removeTrailerVideo2())
    },[])
    

    useMovieTrailer2(movieId);
    const trailerVideo2 = useSelector(store => store.movies?.trailerVideo2);
    const loggedInUser = useSelector(store => store.loginstate?.loggedInUser);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 1 seconds
            if (!trailerVideo2) {
                setShowError(true); // Show error if trailer video is still undefined
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [trailerVideo2]);

    console.log("Looking for trailer video-----");
    console.log(trailerVideo2);

    if (loading) {
        return <LoadinSpinner />;
    }

    if (showError) {
        return <Error/>;
    }

   
    // aspect video 16:9 automatic available it cover whole screen (so we use aspect-video in tailwind)
    return (loggedInUser?<div>
        <iframe className="w-screen aspect-video mt-0"
        src={
            YOUTUBE_URL+trailerVideo2?.key+AUTO_PLAY_MUTE
           } 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share" 
        >
        </iframe>
    </div>:<Login/>)
};



export default VideoPlayOnSelectingCard
