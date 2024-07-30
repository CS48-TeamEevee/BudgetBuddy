import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './SignupForm.js';
import LoginForm from './LoginForm.js';
import InitialSetup from './InitialSetup.js';
// import LoginForm from './LoginForm'; 
const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        {/* <Route path='/setup' element={<InitialSetup />} />
        <Route path='/report' element={<Report />} /> */}
      </Routes>
    </div>
  );
};

export default App;
