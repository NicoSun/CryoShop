import './cart_sidebar.css'
import Total from './Total'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'


function CartSidebar() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart)

  return (
    <div className="cart">
      <div className="cart__list">
    <h4>Shopping Cart</h4>
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
      <button><Link to="/cart" className="nav-link">Checkout</Link></button>
      <div className="cart__sum">
        <Total/>
      </div>

    </div>
  )
}

export default CartSidebar