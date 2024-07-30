import React, { useState } from 'react';
import '../styles/LoginSigninStyles.css';

const signupForm = () => {
  //initialize the fields to be blank
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //handle changes reflecting state changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    console.log('Form submitted', formData);
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

export default signupForm;
