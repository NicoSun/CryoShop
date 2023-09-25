import './cart.css'
import Total from '../components/Total'
import CartItem from '../components/CartItem'
import { useSelector,useDispatch } from 'react-redux'
import {postRequest} from '../api/index.js';
import {resetAllKeys} from '../redux/cartSlice'
import React, { useState } from 'react';
import {Link} from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  let userdata = useSelector(state => state.userGPT.userGPT);
  let loggedin = userdata.loggedin;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const quantities = [];
    const prices = [];
    const product_ids = [];

    cart.forEach(element => {
      quantities.push(element.quantity);
      prices.push(element.product_price);
      product_ids.push(element.id);
    });

    var bodyFormData = new FormData();
    bodyFormData.append('user_id', userdata.id);
    bodyFormData.append('order_address', userdata.address);
    bodyFormData.append('product_id', product_ids);
    bodyFormData.append('product_quantity', quantities);
    bodyFormData.append('product_price', prices);
    
    let response = await postRequest(`Orders/place`,bodyFormData);
    console.log(response);
    dispatch(resetAllKeys());
    setStatus(response.data);

  };

  return (
    <div className="cart_page">
      <div className="cart">
      <div className="cart_list">
  <div>
    <h3>Shopping Cart</h3>
    {cart?.map((item) => (
      <CartItem
      key={item.id}
      id={item.id}
      image={'product_images/' + item.product_imag + '.png'}
      title={item.product_name}
      desc = {item.product_desc}
      price={item.product_price} 
      quantity={item.quantity}
    />
        ))}
      </div>
    </div>
    </div>

      <div className="cart_total">
        <Total/>
      </div>
      <form onSubmit={handleSubmit}>
      {loggedin ? (<button className='buttonstyle placebutton' type="submit">Place Order</button>) :
       (<Link className='linkbutton' to="/account">Please log in to place an Order!</Link>)}
      </form>
      {status ? (<p>{status}</p>) : (<div></div>)}
    
    </div>
    
  )
}

export default Cart