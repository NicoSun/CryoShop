// code for storing pruducts persistently with redux
// not working yet

import { createSlice } from '@reduxjs/toolkit';
const initialState = {categories:[], category: 'none' , productList: []};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    setProductData: (state, action) => {
      state.productList = action.payload;
    },
    // final Reducer: Reset all keys to initial state
    resetAllKeys: (state) => {
      state.category = initialState.category;
      state.productList = initialState.productList;
      state.categories = initialState.categories;
    },
    
  },
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    loadOrders: (state, action) => {
      return action.payload;
    },
  },
});


export const productReducer = productSlice.reducer;
export const {loadCategories, updateCategory,setProductData, resetAllKeys } = productSlice.actions;

export const orderReducer = orderSlice.reducer;
export const { loadOrders } = orderSlice.actions;

export default productSlice.reducer;