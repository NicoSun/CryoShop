import 'bootstrap/dist/css/bootstrap.min.css';
import {getRequest,fetchData} from '../api/index.js';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderList from './OrderList';

function OrdersUser() {
  const userdata = useSelector(state => state.userGPT.userGPT);
  const [orders, setOrders] = useState([]);
  let userID = userdata.id;
  let endpoint = `Orders/user/${userID}`;

  useEffect(() => {
    // Fetch products from the backend
    getRequest(endpoint) // Adjust the URL as needed
      .then((response) => {
        if(response.data.length > 0) {
          setOrders(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  
  console.log(orders);
    if (orders.length === 0){
      return (
        <p>No Orders found!</p>
      )
    } else {
      return (
        <div className="cart">
          <h3>Order List</h3>
          <div className="cart__left">
          {orders?.map((order) => (
            <div key={order.id}>
              <OrderList 
              id={order.id}
              product_id={order.product_id}
              product_quantity={order.product_quantity} 
              order_address={order.order_address}
              ship_date={order.ship_date}
              product_price={order.product_price}
              />
              </div>
          ))}
    </div>
      <div className="cart__right">
      <h4>Options</h4>
      </div>
    </div>
    )
  }
}

export default OrdersUser;