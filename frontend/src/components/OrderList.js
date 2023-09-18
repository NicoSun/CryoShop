import './cartItem.css';
import React, { useState, useEffect } from 'react';
import OrderProduct from './OrderProduct'

const createArray = (string,split) => {
  return string.split(split);
}

const calcTimeSinceOrder = (ship_date) => {
  const today = new Date();
  ship_date = new Date(ship_date);
  return today-ship_date;
}

function MultiplyArraySum(arr1, arr2) {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }

  // Base case: If the arrays are empty, return 0
  if (arr1.length === 0) {
    return 0;
  }

  // Multiply the first elements of both arrays and add them to the result
  const product = arr1[0] * arr2[0];

  // Recursively calculate the sum of the rest of the elements
  const restSum = MultiplyArraySum(arr1.slice(1), arr2.slice(1));

  // Return the sum of the product and the recursive sum
  return product + restSum;
}


function OrderList({id, product_id,product_quantity, order_address, ship_date, product_price}) {
  let productArray = createArray(product_id,',');
  let priceArray = createArray(product_price,',');
  let quantityArray = createArray(product_quantity,',');
  let timeSinceOrder = calcTimeSinceOrder(ship_date);
  let totalCost = MultiplyArraySum(priceArray,quantityArray);

  let status = "unavailable";
  if (timeSinceOrder < 43200000){
    status = "received"
  }
  if (timeSinceOrder > 86400000){
    status = "shipped"
  }
  if (timeSinceOrder > 259200000){
    status = "delivered"
  }
  ship_date = createArray(ship_date,'T');

  return (
    <div className="cartItem">
      <div className="cartItem__info">
        <h5>Order Details</h5>
        <p>Total Price: £{totalCost}</p>
        <p>Address: {order_address}</p>
        <p>Shipping Date: {ship_date[0]}</p>
        <p>Status: {status}</p>
        <h5>Products</h5>
        {productArray.map((item, index) => (
          <OrderProduct
            id={item.id}
            product_id={productArray[index]}
            product_quantity={quantityArray[index]} 
            product_price={priceArray[index]}
          />
        ))}
      </div>
    </div>
  )
}

export default OrderList;