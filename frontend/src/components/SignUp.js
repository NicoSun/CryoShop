import React, { useState } from 'react';
import {postRequest} from '../api/index.js';
import { updateProperty } from '../redux/userslice.js';
import { useDispatch } from 'react-redux';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    let response = await postRequest(`Users/create`,bodyFormData);
    if (response === 406) {
      setStatus('Not a valid email!');
    } else if (response === 409) {
      setStatus("Email already in use!");
    } else {
      for (const [key, value] of Object.entries(response.data)) {
        dispatch(updateProperty({key,value}));
      }
      // Reset the form fields
      setUsername('');
      setPassword('');
      setEmail('');
    } 
  };

  return (
    <div className="user-account">
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button className='buttonstyle' type="submit">Sign Up</button>
        {password !== password2 ? (
          <p>Passwords don't match</p>
        ) : (
          <div></div>
        )}
        {status ? (<p>{status}</p>) : (<div></div>)}
      </form>
    </div>
  );
}

export default SignUp;
