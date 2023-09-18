import 'bootstrap/dist/css/bootstrap.min.css';
import './orders.css'
import {getRequest,fetchData} from '../api/index.js';
import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import OrderList from '../components/OrderList';



function Orders() {
  const userdata = useSelector(state => state.userGPT.userGPT);
  console.log(userdata);
  let loggedin = userdata.loggedin;

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
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderID = 'ca815b4d-d51e-463b-a2e3-1a9b26be7191';

    var bodyFormData = new FormData();
    // bodyFormData.append('orderid', userdata.orderid);
    // bodyFormData.append('email', userdata.email);


    let response = fetchData(`Orders/${orderID}`,bodyFormData);
    console.log(response);

  };

  
  console.log(orders);
  if (loggedin) {
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
  }} else {
    return (
      <div className="container">
        <div className="row">
        <div className="col-lg-6">
        </div>
        <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value=''
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="id">Order Number:</label>
          <input
            type="text"
            id="orderID"
            value=''
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
        </div>
        </div>
        
      </div>
      
    )
  }
  
}

export default Orders;