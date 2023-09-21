import React, { useState } from 'react';
import {postRequest} from '../api/index.js';
import { updateProperty } from '../redux/userslice.js';
import { useDispatch } from 'react-redux';


function Login() {
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    
    let response = await postRequest(`Users/login`,bodyFormData);
    if (response === 406) {
      setStatus('Not a valid email!');
    } else if (response === 401) {
      setStatus('Authentication failed!');
    } else {
      for (const [key, value] of Object.entries(response.data)) {
        dispatch(updateProperty({key,value}));
      }
      // Reset the form fields
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="user-account">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        {status ? (<p>{status}</p>) : (<div></div>)}
      </form>
    </div>
  );
}

export default Login;
