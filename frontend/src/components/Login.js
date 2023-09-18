import React, { useState } from 'react';
import {postRequest} from '../api/index.js';
import { updateProperty } from '../redux/userslice.js';
import { useDispatch } from 'react-redux';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    bodyFormData.append('email', email);

    let response = await postRequest(`Users/login`,bodyFormData);
    for (const [key, value] of Object.entries(response.data)) {
      dispatch(updateProperty({key,value}));
    }

    // Reset the form fields
    // setUsername('');
    // setPassword('');
    // handleLogin(dispatch);
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
      </form>
    </div>
  );
}

export default Login;
