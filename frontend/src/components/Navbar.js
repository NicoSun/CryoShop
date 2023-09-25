import React from 'react';
import "./navbar.css";
import {Link,useNavigate} from 'react-router-dom'
import { updateCategory } from '../redux/productSlice';
import { resetAllKeys } from '../redux/userslice.js';
import { useDispatch,useSelector } from 'react-redux';

const logout = async (dispatch,navigate) => {
  try {
    dispatch(resetAllKeys());
    // await getRequest("Users/logout");
    navigate('/');
  } catch (err) {
    console.log(err);
  }
};

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userdata = useSelector(state => state.userGPT.userGPT);

    
    const handleInputChange = (dispatch,navigate) => {
        try {
          dispatch(updateCategory('none'));
          navigate(0);
        } catch (err) {
          console.log(err);
        }
      };

        return (
            <div className="row">
              <nav className="navbar  navbar-dark bg-dark ">
                  <div className="col-md-10">
                        <ul className="nav">
                            <li className="nav-item" onClick={(e) =>{handleInputChange(dispatch,navigate)}}><Link to="/" className="nav-link active">Home</Link></li>
                            <li className="nav-item"><Link to="/cart" className="nav-link">Cart</Link></li>
                            <li className="nav-item"><Link to="/account" className="nav-link">Account</Link></li>
                            <li className="nav-item"><Link to="/orders" className="nav-link">Orders</Link></li>
                        </ul>
                        </div>
                        <div className="col-md-2 userinfo">
                        <p>{userdata.username}</p>
                        {userdata.loggedin ? (
                          <span onClick={(e) =>{logout(dispatch,navigate)}}>Log Out!</span>
                        ) : (<div></div>)}
              </div>
                  </nav>
              
              
            </div>
        )
}

export default Navbar;
