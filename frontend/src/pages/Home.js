import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import CartSidebar from '../components/CartSidebar.js';
import Products from '../components/Products.js'
import Categories from '../components/Categories.js'

function Home() {
  
  // const getTotalQuantity = () => {
  //   let total = 0
  //   cart.forEach(item => {
  //     total += item.quantity
  //   })
  //   return total
  // }

  return (
    <div className="container">
      <div className="home__container">
      <div className="row">
      </div>
        <div className="row">
        <div className="col-lg-1">
        <Categories />
        </div>
        <div className="col-lg-8 product_grid">
        <h2>Product List</h2>
          <Products />
        </div>
        <div className="col-lg-3">
        <CartSidebar />
        {/* <p>{getTotalQuantity() || 0}</p> */}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home