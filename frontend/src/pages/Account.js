// import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login.js';
import SignUp from '../components/SignUp.js';

function Account() {
  // const cart = useSelector((state) => state.cart)
  let loggedin = false

  if (loggedin) {
    return (
    <div className="cart">
      <h3>Account Page</h3>
      <div className="cart__left">
      <h4>Setting</h4>
      <ul>
        <li>Payment</li>
        <li>Address</li>
      </ul>
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
          <Login />
        </div>
        <div className="col-lg-6">
          <SignUp />
        </div>
        </div>
        
        
        
      </div>
      
    )
  }
  
    
  
}

export default Account