import './cart.css'
import Total from '../components/Total'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'
import {postRequest} from '../api/index.js';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  let userdata = useSelector(state => state.userGPT.userGPT);

  const handleSubmit = (event) => {
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
    
    let response = postRequest(`Orders/place`,bodyFormData);
    console.log(response);

  };

  return (
    <div className="cart">
      <div className="cart__left">
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

      <div className="cart__right">
        <Total/>
      </div>
      <form onSubmit={handleSubmit}>
      <button type="submit">Place Order</button>
      </form>
      

    </div>
  )
}

export default Cart