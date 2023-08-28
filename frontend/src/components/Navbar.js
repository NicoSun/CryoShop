import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
            <div className="row">
              <div className="col-md-12">
                  <nav className="navbar  navbar-dark bg-dark ">
                        <ul className="nav">
                            <li className="nav-item" ><Link to="/" className="nav-link active">Products</Link></li>
                            <li className="nav-item"><Link to="/cart" className="nav-link">Cart</Link></li>
                            <li className="nav-item"><Link to="/Account" className="nav-link">Account</Link></li>
                        </ul>
                  </nav>
              </div>
            </div>
        )
    }
}

export default Navbar;
