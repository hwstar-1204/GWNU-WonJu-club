import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
function App() {
  return (
    <div className="App">
 
 <Routes>
  <Route path="/login" element={<div>로그인페이지</div>}/>
  <Route path="/signup" element={<div>회원가입페이지</div>}/>
 </Routes>
 </div>
  );
}

export default App;