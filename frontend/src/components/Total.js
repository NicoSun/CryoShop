import './total.css'
import {useSelector} from 'react-redux'

function Total() {
  const cart = useSelector((state) => state.cart.cart)

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.product_price * item.quantity
    })
    let displayPrice = (Math.round(100 * totalPrice)/100).toFixed(2) ;
    return {displayPrice, totalQuantity}
  }
 
  return (
    <div className="total">
      <h4>ORDER SUMMARY</h4>
      {cart.length === 0 ? (
        <p>Nothing in the basket yet.</p>
      ) : (
        <div>
          <p className="total__p">
        total ({getTotal().totalQuantity} items) 
        : <strong>£{getTotal().displayPrice}</strong>
      </p>
        <p>Shipping: <span className='shipping'>Free</span></p>
        <p>Dispatch after 1 Day! Delivery in 3 Days!</p>
        </div>
      )}
      
    </div>
  )
}

export default Total