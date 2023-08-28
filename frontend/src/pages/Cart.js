import './cart.css'
import Total from '../components/Total'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'

function Cart() {
  const cart = useSelector((state) => state.cart)

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

    </div>
  )
}

export default Cart