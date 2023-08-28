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
      <p className="total__p">
        total ({getTotal().totalQuantity} items) 
        : <strong>${getTotal().displayPrice}</strong>
      </p>
    </div>
  )
}

export default Total