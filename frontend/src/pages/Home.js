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
        <div className="col-lg-2 categories">
        <Categories />
        </div>
        <div className="col-lg-7 product_grid">
          <Products />
        </div>
        <div className="col-lg-3 sidebar">
        <CartSidebar />
        </div>
        </div>
      </div>
  )
}

export default Home