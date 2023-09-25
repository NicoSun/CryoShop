import './cart_sidebar.css'
import Total from './Total'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'


function CartSidebar() {
  const cart = useSelector((state) => state.cart.cart)

  return (
    <div className="cart">
    <div className="cart_list">
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
      <div className="cart__sum">
        <Total/>
      </div>
      
      <button id='checkout' className='buttonstyle'><Link to="/cart" className="nav-link">Checkout</Link></button>

    </div>
  )
}

export default CartSidebar