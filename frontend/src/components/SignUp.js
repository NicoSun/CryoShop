import React, { useState } from 'react';
import axios from 'axios';

let API_URL = process.env.REACT_APP_BACKEND_URL;
let url = `${API_URL}/Users/create`;

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can add your SignUp logic here, such as making an API call to authenticate the user.
    // For this example, let's just log the username and password to the console.
    console.log('Username:', username);
    console.log('Password:', password);

    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    axios.post(url,bodyFormData).then((response) => {
      console.log(response);
    });



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
