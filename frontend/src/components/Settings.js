// import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateProperty } from '../redux/userslice.js';
import {putRequest} from '../api/index.js';

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
    // console.log(response);

  };

    return (
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
              type="text"
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
          <button className='buttonstyle savebutton' type="submit">Save</button>
        </form>
        <button className='buttonstyle savebutton'>Change Password</button>
      </div>
      </div>
    );

}

export default Settings;
