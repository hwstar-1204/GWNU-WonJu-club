import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Main/MainPage';
import LoginPage from './Login/LoginPage';
import PrivacyPolicyPage from './Signup/PrivacyPolicyPage';
import SignupDetailPage from './Signup/SignupDetailPage';
import ResetPasswordPage from './Login/ResetPasswordPage';
import MyPage from './Mypage/Mypage';
import MainLater from './Main/Main-later';
import Editinformation from './Mypage/EditInformation';
import Changepassword from './Mypage/ChangePassword';
import { UserProvider } from './UserContext'; // UserProvider import 추가

function App() {
  return (
    <UserProvider> {/* UserProvider로 감싸기 */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />c
        <Route path="/signup" element={<PrivacyPolicyPage />} />
        <Route path="/signup/details" element={<SignupDetailPage />} />
        <Route path="/login/reset-password" element={<ResetPasswordPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/main-later" element={<MainLater />} />
        <Route path="/editif" element={<Editinformation />} />
        <Route path="/change-password" element={<Changepassword />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
