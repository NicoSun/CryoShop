import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateProperty } from '../redux/userslice.js';
import {putRequest} from '../api/index.js';
import SettingsAdv from './SettingsAdv.js'

  const handleInputChange = (dispatch,key,value) => {
    try {
      dispatch(updateProperty({key,value }));
    } catch (err) {
      console.log(err);
    }
  };


function Settings() {
  const dispatch = useDispatch();
  let userdata = useSelector(state => state.userGPT.userGPT);
  const [status, setStatus] = useState('');
  // const [advSettings, setAdvSettings] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append('id', userdata.id);
    bodyFormData.append('email', userdata.email);
    bodyFormData.append('username', userdata.username);
    bodyFormData.append('firstname', userdata.firstname);
    bodyFormData.append('lastname', userdata.lastname);
    bodyFormData.append('address', userdata.address);
    bodyFormData.append('payment', userdata.payment);

    let response = putRequest(`Users/update`,bodyFormData);
    if (response.status === 201) {
      setStatus('success');
    }  else if (response === 409) {
      setStatus("Email already in use!");
    } else if (response === 406) {
      setStatus("Invalid Email");
    } 

  };

    
      if (userdata.advSetting) {
        return (
        <SettingsAdv 
        id={userdata.id}
        />
        )
      } else {
        return (
          <div className="container">
            <button className='buttonstyle savebutton settingswitcher' onClick={(e) => handleInputChange(dispatch,'advSetting',true)}>Advanced Settings</button>
            <div className="row">
         <div className="col-lg-6">
         <div className="flex-container">
        <div className="user-account">
        <h2>Settings</h2>
        <form onSubmit={handleSubmit}>
            <label for="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              value={userdata.firstname}
              onChange={(e) => handleInputChange(dispatch,"firstname",e.target.value)}
              required
            />
            <label for="lastname">Lastname:</label>
            <input
              type="text"
              id="lastname"
              value={userdata.lastname}
              onChange={(e) => handleInputChange(dispatch,"lastname",e.target.value)}
              required
            />
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              value={userdata.email}
              onChange={(e) => handleInputChange(dispatch,"email",e.target.value)}
              required
            />
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              value={userdata.username}
              onChange={(e) => handleInputChange(dispatch,"username",e.target.value)}
              required
            />

            <label for="address">Address:</label>
            <input
              type="text"
              id="address"
              value={userdata.address}
              onChange={(e) => handleInputChange(dispatch,"address",e.target.value)}
              required
            />
            <label for="payment">Payment:</label>
            <input
              type="text"
              id="payment"
              value={userdata.payment}
              onChange={(e) => handleInputChange(dispatch,"payment",e.target.value)}
              required
            />
          <button className='buttonstyle savebutton' type="submit">Save User details</button>
          {status ? (<p>{status}</p>) : (<div></div>)}
        </form>
      </div>
      </div>
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
      };

}

export default Settings;
