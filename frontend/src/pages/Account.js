// import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './account.css'
import Login from '../components/Login.js';
import SignUp from '../components/SignUp.js';
import Settings from '../components/Settings.js';
import { useSelector } from 'react-redux';

function Account() {
  const userdata = useSelector(state => state.userGPT.userGPT);
  let loggedin = userdata.loggedin;

  if (loggedin) {
    return (
      <div className="container">
        <h1>Account Page</h1>
         <div className="row">
         <div className="col-lg-6">
         <Settings />
         </div>
         <div className="col-lg-6 contact-options">
         <h2>Contact Options</h2>
          <label for="pet-select">Newsletter frequency:</label>

          <select name="newsletter" id="newsletter">
            <option value="never">-Please choose an option-</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
         </div>
      </div>
    </div>
    )
  } else {
    return (
      <div className="container">
        <div className="row">
        <div className="col-lg-6">
          <Login />
        </div>
        <div className="col-lg-6">
          <SignUp />
        </div>
        </div>
      </div>
      
    )
  }
  
    
  
}

export default Account