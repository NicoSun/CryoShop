import React, { useState } from 'react';
import {postRequest} from '../api/index.js';
import { updateProperty } from '../redux/userslice.js';
import { useDispatch } from 'react-redux';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    let response = await postRequest(`Users/create`,bodyFormData);
    for (const [key, value] of Object.entries(response.data)) {
      dispatch(updateProperty({key,value}));
    }
    console.log(response);

    // Reset the form fields
    // setUsername('');
    // setPassword('');
    // setEmail('');
  };

  return (
    <div className="user-account">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            id="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        {password !== password2 ? (
          <p>Passwords don't match</p>
        ) : (
          <div></div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
