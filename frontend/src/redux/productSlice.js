// code for storing pruducts persistently with redux
// not working yet

import { createSlice } from '@reduxjs/toolkit';
const initialState = {categories:[], category: 'none' , productList: []};
// const initialStateOrders = {orders: {id:'', user_id: 'none' , product_id: '',product_quantity: ''}};


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


// const orderSlice = createSlice({
//   name: 'orders',
//   initialState; initialStateOrders
//   reducers: {
//     updateProperty: (state, action) => {
//       const { key, value } = action.payload;
//       state.orders[key] = value;
//       },
//       resetOrderKeys: (state) => {
//         state.orders.id = initialStateOrders.id;
//         state.orders.user_id = initialStateOrders.user_id;
//         state.orders.product_id = initialStateOrders.product_id;
//         state.orders.product_quantity = initialStateOrders.product_quantity;
//       },
//   },
// });


export const productReducer = productSlice.reducer;
export const {loadCategories, updateCategory,setProductData, resetAllKeys } = productSlice.actions;

// export const orderReducer = orderSlice.reducer;
// export const { updateProperty} = orderSlice.actions;

export default productSlice.reducer;