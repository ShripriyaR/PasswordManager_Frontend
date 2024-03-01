import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Welcome from './Welcome';
import Home1 from './Home1';

function App() {
    return <BrowserRouter>
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/SignUpPage" element={<SignUp />} />
                <Route path="/LoginPage" element={<Login />} />
                <Route path="/Home" element={<Home1/>} />
            </Routes>
        </div>
    </BrowserRouter>
}

export default App
