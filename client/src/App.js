import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialSetup from './components/InitialSetup';
import InitialReport from './components/InitialReport';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InitialSetup />} />
                <Route path="/initialReport" element={<InitialReport />} />
            </Routes>
        </Router>
    );
}

export default App;