import { createSlice } from "@reduxjs/toolkit"

const searchMovieSlice = createSlice({
    name: 'searchMovie',
    initialState: {
        showSearch: false,
        Movies: null,
        movieResults: null,
        movieNames: null
    },
    reducers: {
        toggleSearchView: (state) => {
            state.showSearch = !state.showSearch;
        },
        addMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults
        },
        removeMovieResult:(state,action) => {
            state.movieNames = null
            state.movieResults = null 

        }
    },

});

export const { toggleSearchView, addMovieResult, removeMovieResult} =searchMovieSlice.actions;
export default searchMovieSlice.reducer;