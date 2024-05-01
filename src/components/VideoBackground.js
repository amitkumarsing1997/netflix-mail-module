import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import {YOUTUBE_URL,AUTO_PLAY_MUTE} from "../utils/constants"

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  // aspect video 16:9 automatic available it cover whole screen (so we use aspect-video in tailwind)
  return (
    <div className="">
      <iframe
        className="w-screen aspect-video"
        src={
         YOUTUBE_URL +trailerVideo?.key+ AUTO_PLAY_MUTE

        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>



  );
};

export default VideoBackground;
