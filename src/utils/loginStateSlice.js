import { createSlice } from "@reduxjs/toolkit"

const loginStateSlice = createSlice({
    name: 'loginstate',
    initialState: {
    loggedInUser: false
    },
    reducers: {
      
        addLoggedInUser: (state, action) => {
            state.loggedInUser = true
        },
        removeLoggedInUser:(state,action) => {
            state.loggedInUser = false

        }
    },

});

export const { addLoggedInUser,removeLoggedInUser } =loginStateSlice.actions;
export default loginStateSlice.reducer;