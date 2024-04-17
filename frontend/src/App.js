import { Routes, Route } from 'react-router-dom';
import LoginPage from './Login/LoginPage'; // 로그인 페이지 컴포넌트
import PrivacyPolicyPage from './Signup/PrivacyPolicyPage'; // 개인정보 처리방침 페이지 컴포넌트
import SignupDetailPage from './Signup/SignupDetailPage'; // 회원가입 상세 페이지 컴포넌트

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<PrivacyPolicyPage />} />
        <Route path="/signup/details" element={<SignupDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
