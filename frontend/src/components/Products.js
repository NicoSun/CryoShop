import './Products.css';
import React, { useEffect } from 'react';
import { addToCart } from '../redux/cartSlice';
import { setProductData } from '../redux/productSlice';
import { useSelector,useDispatch } from 'react-redux';

import {fetchData} from '../api/index.js';

const fetchAndSetData = () => async (dispatch) => {
  try {
      let endpoint = "Products/allproducts";
      const data = await fetchData(endpoint);
      dispatch(setProductData(data));
  } catch (error) {
      console.log(error);
  }
  };

const Products = () => {
  const dispatch = useDispatch();

// redux code 
    useEffect(() => {
      dispatch(fetchAndSetData());
    }, [dispatch]);


  const products = useSelector((state) => state.products)
  // console.log(products);

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
};

export default Products;
