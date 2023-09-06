import React, { useState } from 'react';
import {postRequest} from '../api/index.js';


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    let response = postRequest(`Users/create`,bodyFormData);
    // console.log(response);

    // Reset the form fields
    setUsername('');
    setPassword('');
    setEmail('');
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
