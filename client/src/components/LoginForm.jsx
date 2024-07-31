import React, { useState } from 'react';
import '../styles/LoginSigninStyles.css';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData is ', formData);
    //need to get username back from backend on successful login
    // '/api/login',POST req.
    // {username : username, result: 'success'}
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('returned from verifylogin middleware:', data);
        if(data.result === 'success') {
          navigate('/setup', {state: {username : data.username}})
        }
        //navigate
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Form submitted', formData);
  };

  return (
    <div className='login-form-container'>
      <h1 className='login-title'>BudgetBuddy</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <a href='/'>Signup</a>
      </p>
    </div>
  );
};

export default LoginForm;
