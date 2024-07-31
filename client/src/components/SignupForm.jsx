import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSigninStyles.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('User created successfully', data);
        navigate('/setup', { state: { user: data } }); // Pass data to the InitialSetup component
      } else {
        console.error('Error creating user', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='signup-form-container'>
      <h1>BudgetBuddy</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
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
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type='submit'>Sign Up</button>
      </form>
      <p>
        Already have an account? <a href='/login'>Login</a>
      </p>
    </div>
  );
};

export default SignupForm;