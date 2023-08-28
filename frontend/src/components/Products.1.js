import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
// import { setData } from '../redux/productSlice';
// import { useSelector } from 'react-redux'
import axios from 'axios';

let API_URL = process.env.REACT_APP_BACKEND_URL;
let url = `${API_URL}/Products/allproducts`;


const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  

  useEffect(() => {
    // Fetch products from the backend
    axios.get(url) // Adjust the URL as needed
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);


// redux code not working
  //   useEffect(() => {
  //     dispatch(fetchAndSetData());
  //   }, [dispatch]);


  // const products = useSelector((state) => state.products)
  // console.log(products);

  return (
    <div className="products">
      <h2>Product List</h2>
      <ul>
      {products?.map((product) => (
          <li key={product.id}>
            <strong>{product.product_name}</strong>
            <p>{product.product_desc}</p>
            <p>Price: £{product.product_price}</p> {/* Display price in GBP */}
            <img src={'product_images/' + product.product_imag + '.png'}/>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
