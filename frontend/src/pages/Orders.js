import 'bootstrap/dist/css/bootstrap.min.css';
import './orders.css'
import {getRequest} from '../api/index.js';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import OrderUser from '../components/OrdersUser';
import OrderList from '../components/OrderList';


function Orders() {
  const [orderID, setOrderID] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [status, setStatus] = useState('');
  const userdata = useSelector(state => state.userGPT.userGPT);
  // console.log(userdata);
  let loggedin = userdata.loggedin;
  let response = '';
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const orderID = '0d726ccd-a411-46c9-97d1-537ecfa96c34';
    response = await getRequest(`Orders/${orderID}`);
    console.log(response);
    if (response === 400) {
      setStatus('Not a valid orderID!');
    } else {
      setOrderData(response.data);
    }
  };

  if (loggedin) {
    return (
      <OrderUser />
    )
    }
    else {
    return (
      <div className="container">
        <div className="row">
        <div className="col-lg-6">
        {orderData?.map((order) => (
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
        {/* {orderData ? (<p>{response}</p>) : (<p>{orderData}</p>)} */}
        </div>
        <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Order Number:</label>
          <input
            type="text"
            id="orderID"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            required
          />
        </div>
        <button className='buttonstyle' type="submit">Submit</button>
        {status ? (<p>{status}</p>) : (<div></div>)}
      </form>
        </div>
        </div>
        
      </div>
      
    )
  }
  
}

export default Orders;