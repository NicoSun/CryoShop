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
         <Settings />
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