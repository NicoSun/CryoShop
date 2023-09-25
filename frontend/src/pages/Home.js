import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CartSidebar from '../components/CartSidebar.js';
import Products from '../components/Products.js'
import Categories from '../components/Categories.js'

function Home() {
  

  return (
      <div className="container">
      <div className="row">
      </div>
        <div className="row">
        <div className="col-xs-12 col-lg-2 categories">
        <Categories />
        </div>
        <div className="col-xs-12 col-lg-10  col-xl-7 product_grid">
          <Products />
        </div>
        <div className="col-xl-3 d-none d-xl-block sidebar">
        <CartSidebar />
        </div>
        </div>
      </div>
  )
}

export default Home