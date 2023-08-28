import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/cartSlice'; // Adjust the path as needed
import UserAccount from './components/UserAccount';
import Categories from './components/Categories';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

const store = configureStore({
  reducer: rootReducer,
});

const App = () => {

  return (
    <Provider store={store}>
      <div className="container">
      <div className="row">
          <UserAccount />
        </div>
      <div className="row">
        <div className="col-lg-3">
          <Categories />
        </div>
        <div className="col-lg-6">
          <Products />
        </div>
        <div className="col-lg-3">
          <ShoppingCart />
        </div>
      </div>
    </div>
    </Provider>
    
  );

};

export default App;
