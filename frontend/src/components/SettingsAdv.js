import React, { useState } from 'react';
import {putRequest,postRequest} from '../api/index.js';
import { useDispatch } from 'react-redux';
import { updateProperty,resetAllKeys } from '../redux/userslice.js';

const handleInputChange = (dispatch,key,value) => {
  try {
    dispatch(updateProperty({key,value }));
  } catch (err) {
    console.log(err);
  }
}

function SettingsAdv({id}) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');
    const [status2, setStatus2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
  
    const handlePassChange = async (event) => {
      event.preventDefault();
  
      var bodyFormData = new FormData();
      bodyFormData.append('id', id);
      bodyFormData.append('password', password);
      
      let response = await putRequest(`Users/update/password`,bodyFormData);
         if (response.status === 201) {
        // Reset the form fields
        setPassword('');
        setPassword2('');
        setStatus('Password changed successful');
      }
      };

    const handleDeletion = async (event) => {
      event.preventDefault();
  
      var bodyFormData = new FormData();
      bodyFormData.append('id', id);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      
      let response = await postRequest(`Users/delete`,bodyFormData);
      if (response === 401) {
        setStatus2('Authentication failed!');
      } else if (response.status === 200) {
        // Reset the form fields
        setEmail('');
        setPassword('');
        dispatch(resetAllKeys());
      }
      };

      return (
        <div className="container">
        <button className='buttonstyle savebutton settingswitcher' onClick={(e) => handleInputChange(dispatch,'advSetting',false)}>Back</button>
        <div className="row">
        <div className="col-lg-6">
      
        <div className="settings_adv">
          <h2>Change Password</h2>
          <form onSubmit={handlePassChange}>
          <div>
              <input
                type="password"
                id="new_password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="new_password 2"
                placeholder="New Password confirm"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
    
            <button className='buttonstyle' type="submit">Save New Password</button>
            {status ? (<p>{status}</p>) : (<div></div>)}
            {password !== password2 ? (
          <p>Passwords don't match</p>) : (<div></div>)}
          </form>
        </div>
        </div>

        <div className="col-lg-6">
        <h2>Delete Account</h2>
        <form onSubmit={handleDeletion}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Confirm Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
          <div>
              <input
                type="password"
                id="new_password"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='buttonstyle' type="submit">Delete Account</button>
            {status2 ? (<p>{status2}</p>) : (<div></div>)}
          </form>
        </div>
        </div>
        </div>
      );

    };
  
  export default SettingsAdv;
  