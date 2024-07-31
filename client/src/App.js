import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignupForm from './components/SignupForm.jsx';
// import LoginForm from './components/LoginForm.jsx';
// import InitialSetup from './components/InitialSetup.jsx';
// import Report from './components/InitialReport.jsx';


const App = () => {
  return (
    <>
      <div>Hello</div>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignupForm />} />
            {/* <Route path='/login' element={<LoginForm />} />
            <Route path='/setup' element={<InitialSetup />} />
            <Route path='/report' element={<Report />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
