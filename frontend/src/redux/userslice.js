import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
userGPT: {id:'000',firstname:'Firstname',lastname:'Lastname',email:'email@liame.org',username:'Guest',address:'Moon',payment:'Spacebucks',loggedin: false},
};

// Create a slice
const objectSlice = createSlice({
name: 'userGPT',
initialState,
reducers: {
    updateProperty: (state, action) => {
    const { key, value } = action.payload;
    state.userGPT[key] = value;
    },
    resetAllKeys: (state) => {
        state.userGPT.id = initialState.id;
        state.userGPT.firstname = initialState.firstname;
        state.userGPT.lastname = initialState.lastname;
        state.userGPT.email = initialState.email;
        state.userGPT.username = initialState.username;
        state.userGPT.address = initialState.address;
        state.userGPT.payment = initialState.payment;
        state.userGPT.loggedin = initialState.loggedin;
      },
},
});

// Export the action creator
export const userReducerGPT = objectSlice.reducer;
export const { updateProperty,resetAllKeys } = objectSlice.actions;

// Export the reducer
export default objectSlice.reducer;
  