import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
import searchMovieReducer from "./searchMovieSlice"
import configReducer from "./configSlice"
import loginStateReducer from "./loginStateSlice"


const appStore = configureStore( {
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        searchmovie: searchMovieReducer,
        config: configReducer,
        loginstate: loginStateReducer
    },
}) 

export default appStore