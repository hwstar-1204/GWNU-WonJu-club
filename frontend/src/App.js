import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import MainPage from './Main/MainPage';
import LoginPage from './Login/LoginPage';
import PrivacyPolicyPage from './Signup/PrivacyPolicyPage';
import SignupDetailPage from './Signup/SignupDetailPage';
import ResetPasswordPage from './Login/ResetPasswordPage';

function App() {
  return (
  
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<PrivacyPolicyPage />} />
        <Route path="/signup/details" element={<SignupDetailPage />} />
        <Route path="/login/reset-password" element={<ResetPasswordPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>

     
  );
}

export default App;