import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
userGPT: {firstname:'Firstname',lastname:'Lastname',email:'email@liame.org',username:'Somebody',address:'Moon',payment:'Spacebucks'},
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
},
});

// Export the action creator
export const userReducerGPT = objectSlice.reducer;
export const { updateProperty } = objectSlice.actions;

// Export the reducer
export default objectSlice.reducer;
  