import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import {
  removeNowPlayingMovies,
  removePopularMovies,
  removeTopRatedMovies,
  removeTrailerVideo,
  removeUpComingMovies,
  removeTrailerVideo2,
} from "../utils/moviesSlice";
import { LOGO, USER_LOGO } from "../utils/constants";
import { toggleSearchView, removeMovieResult } from "../utils/searchMovieSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SUPPORTD_LANGUAGES } from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";
import UserDetail from "./UserDetail";
import LocationComponent from "./LocationComponent";
import { removeLoggedInUser } from "../utils/loginStateSlice";

const Header = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showSearch = useSelector((store) => store.searchmovie.showSearch);
  const handleSignOut = () => {
    dispatch(removeUser());
    dispatch(removeNowPlayingMovies());
    dispatch(removePopularMovies());
    dispatch(removeTopRatedMovies());
    dispatch(removeUpComingMovies());
    dispatch(removeTrailerVideo());
    dispatch(removeTrailerVideo2());
    dispatch(removeMovieResult());
    dispatch(removeLoggedInUser());
    navigate("/");
  };

  const handleImageClick = () => {
    setShowUserDetails((prevState) => !prevState);
  };


  useEffect(() => {
    const checkAuthState = () => {
      if (user) {
        navigate("/browse");
      } else {
        // dispatch(removeUser())
        navigate("/");
      }
    };
    checkAuthState();
  }, []);

  const handleSearchClick = () => {
    // Toggle Search
    dispatch(toggleSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    // for overlap img use absolute

    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="mx-auto md:mx-0 w-44 " src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-2 justify-between">
          {showSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white rounded-full"
              onChange={handleLanguageChange}
            >
              {SUPPORTD_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-4 my-2 bg-green-800 rounded-lg"
            onClick={handleSearchClick}
          >
            {showSearch ? "Homepage" : "Search"}
          </button>

          <div className="relative">
            <img
              className="hidden md:block w-12 h-12 cursor-pointer"
              alt="usericon"
              src={USER_LOGO}
              onClick={handleImageClick}
            />
            {showUserDetails && (
              <div className="absolute top-20 right-0">
                <UserDetail />
                <LocationComponent />
              </div>
            )}
          </div>

          <button onClick={handleSignOut} className="mx-2 font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
