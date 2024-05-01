import { React, useRef } from "react";
import { lang } from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieResult } from "../utils/searchMovieSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMoviewTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    // console.log(data)
    const json = await data.json();
    return json.results;
  };

  const handleSearchClick = async () => {
    // For each movie I  will search TMDB API

    const searchMovies1 = searchText.current.value;

    // const searchMovies = ["raj","dhoom"]
    const searchMovies = searchMovies1.split(",");
    const promiseArray = searchMovies.map((movie) => searchMoviewTMDB(movie));
    // searchMoviewTMDB("raj")
    // so in above searchMovieTMDB gives us 5 promises so basically searchMovie Tmdb return promise not the result
    //[Promise, Promise, Promise, Prommise, Promise]
    // means this API call not immediatelly gave result it takes some time

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addMovieResult({ movieNames: searchMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="rounded-lg p-4 m-4 col-span-9"
          placeholder={lang[langKey].searchPlaceholder}
        />
        <button
          className="p-4 m-4 bg-red-800 text-white rounded-lg col-span-3"
          onClick={handleSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
