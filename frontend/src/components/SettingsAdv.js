import React, { useState } from 'react';
import {putRequest} from '../api/index.js';

function SettingsAdv({id}) {
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      var bodyFormData = new FormData();
      bodyFormData.append('id', id);
      bodyFormData.append('password', password);
      
      let response = await putRequest(`Users/update/password`,bodyFormData);
         if (response.status = 201) {
        // Reset the form fields
        setPassword('');
        setPassword2('');
        setStatus('Password changed successful');
      }
        
      };

      return (
        <div className="settings_adv">
          <form onSubmit={handleSubmit}>
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
      );

    };
  
  export default SettingsAdv;
  