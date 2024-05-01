import React from "react";
import SearchBar from "./SearchBar";
import MovieSuggestions from "./MovieSuggestions";
import { BACKGROUND_IMG } from "../utils/constants";

const Search = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover md:w-screen"
          src={BACKGROUND_IMG}
          alt="background_img"
        />
      </div>

      <div className="">
        <SearchBar />
        <MovieSuggestions />
      </div>
    </>
  );
};
export default Search;
