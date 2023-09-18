import './Products.css';
import React, { useEffect } from 'react';
import { addToCart } from '../redux/cartSlice';
import { setProductData } from '../redux/productSlice';
import { useSelector,useDispatch } from 'react-redux';

import {fetchData} from '../api/index.js';

const fetchAndSetData = (category) => async (dispatch) => {
  try {
      let endpoint = `Products/categories/${category}`
      const data = await fetchData(endpoint);
      dispatch(setProductData(data));
  } catch (error) {
      console.log(error);
  }
  };

const Products = () => {
  const dispatch = useDispatch();
  let productsState = useSelector(state => state.products);
  let category = productsState.category;

// redux code 
    useEffect(() => {
      dispatch(fetchAndSetData(productsState.category));
    }, [dispatch]);

  let products = productsState.productList;
  
  // console.log(products);

  if (category === 'none') {
    return (
      <div>
        <h2>Welcome to Cryosphere Computing Shop!</h2>
        <p>This is a demo website for a Full-Stack Web Application using
           React/Redux frontend,express Node.js backend and a postgres database.</p>
           <p>The App follows CRUD & REST principles.</p>
           <p>You can't actually buy any products and there is no mail service 
            to reset passwords or send order confirmations.</p>
            <p>All product images have been generated with stable diffusion AI.</p>
      </div>
      
    )
  } else {
    return (
      <div className="products">
        {products?.map((product) => (
  
          <div className="card" key={product.id}>
          <img className="card-img-top" src={'product_images/' + product.product_imag + '.png'} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{product.product_name}</h5>
            <p className="card-text">{product.product_desc}</p>
            <p>Price: £{product.product_price}</p> {/* Display price in GBP */}
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
          </div>
          ))}
      </div>
    );
  }

  
};

export default Products;
