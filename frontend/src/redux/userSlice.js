import { createSlice } from '@reduxjs/toolkit';

// Use createSlice from @reduxjs/toolkit to define reducers with less boilerplate
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    logout: () => null,
  },
});


export const userReducer = userSlice.reducer;
export const { setData } = userSlice.actions;

export default userSlice.reducer;