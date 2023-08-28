// code for storing pruducts persistently with redux
// not working yet

import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProductData: (state, action) => {
      return action.payload;
    },
  },
});

const categorySlice = createSlice({
  name: 'category',
  initialState: [],
  reducers: {
    loadCategories: (state, action) => {
      return action.payload;
    },
  },
});


export const productReducer = productSlice.reducer;
export const { setProductData } = productSlice.actions;

export const categoryReducer = categorySlice.reducer;
export const { loadCategories } = categorySlice.actions;

export default productSlice.reducer;