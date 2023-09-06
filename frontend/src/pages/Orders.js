// import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {postRequest} from '../api/index.js';
import { useSelector,useDispatch } from 'react-redux';
import CartItem from '../components/CartItem'
const handleSubmit = (event) => {
  event.preventDefault();

  // dispatch(userController(username, password));

  var bodyFormData = new FormData();
  let response = postRequest(`Users/create`,bodyFormData);
  console.log(response);

};

function Orders() {
  const cart = useSelector((state) => state.cart.cart)
  let loggedin = true

  if (loggedin) {
    return (
    <div className="cart">
      <h3>Order List</h3>
      <div className="cart__left">
      {cart?.map((item) => (
      <CartItem
        key={item.id}
        id={item.id}
        image={'product_images/' + item.product_imag + '.png'}
        title={item.product_name}
        // desc = {item.product_desc}
        price={item.product_price} 
        quantity={item.quantity}
      />
        ))}
    </div>

      <div className="cart__right">
      <h4>Options</h4>
      </div>
    </div>
    )
  } else {
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
          <label htmlFor="password">Order Number:</label>
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