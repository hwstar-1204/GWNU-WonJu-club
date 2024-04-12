import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // 로그인 페이지 컴포넌트 import

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<div>회원가입페이지</div>} />
      </Routes>
    </div>
  );
}

export default App;
