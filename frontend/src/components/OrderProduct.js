import './cartItem.css';
import React, { useState, useEffect } from 'react';
import {getRequest} from '../api/index.js';



function OrderProduct({id, product_id,product_quantity,product_price}) {
  const [product, setProduct] = useState([]);
  let endpoint = `Products/get/${product_id}`;

  useEffect(() => {
    // Fetch products from the backend
    getRequest(endpoint) // Adjust the URL as needed
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  
  return (
    <div className="cartItem">
      <img className="cartItem__image" src={'product_images/' + product.product_imag + '.png'} alt='itemImage'/>
      <div className="cartItem__info">
        <p className="cartItem__title">{product.product_name}</p>
        <p className="cartItem__price">
          <strong>Price: £{product_price}</strong>
        </p>
        <p>Quantity: {product_quantity}</p>
      </div>
    </div>
  )
}

export default OrderProduct;