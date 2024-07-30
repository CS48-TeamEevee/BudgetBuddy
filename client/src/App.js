import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm.js';
import LoginForm from './components/LoginForm.js';
import InitialSetup from './components/InitialSetup.js';
import Report from './components/InitialReport.js';
// import LoginForm from './LoginForm'; 
const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/setup' element={<InitialSetup />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </div>
  );
};

export default App;