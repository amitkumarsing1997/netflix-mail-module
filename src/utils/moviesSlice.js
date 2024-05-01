import { createSlice } from "@reduxjs/toolkit";
const moviesSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        topRatedMovies: null,
        upComingMovies: null,
        trailerVideo2: null
    },
    reducers:{
        addNowPlayingMovies:(state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies:(state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies:(state, action) => {
            state.topRatedMovies = action.payload
        },
        addUpComingMovies:(state, action) => {
            state.upComingMovies = action.payload
        },
        addTrailerVideo:(state, action) => {
            state.trailerVideo  = action.payload
        },
        addTrailerVideo2:(state, action) => {
         state.trailerVideo2 = action.payload
        },
        removeNowPlayingMovies:(state, action) => {
             state.nowPlayingMovies = null
        },
        removePopularMovies:(state, action) => {
            state.popularMovies = null
        },
        removeTopRatedMovies:(state, action) => {
            state.topRatedMovies = null
        },
        removeUpComingMovies:(state, action) => {
            state.upComingMovies = null
        },
        removeTrailerVideo:(state, action) => {
            state.trailerVideo = null
        },
        removeTrailerVideo2:( state,action) => {
            state.trailerVideo2 = null
        },
    },
});

export const {
addNowPlayingMovies, 
addPopularMovies, 
addTopRatedMovies, 
addUpComingMovies,
addTrailerVideo,
addTrailerVideo2,
removeNowPlayingMovies,
removePopularMovies,
removeTopRatedMovies,
removeUpComingMovies,
removeTrailerVideo,
removeTrailerVideo2} = moviesSlice.actions;
export default moviesSlice.reducer;