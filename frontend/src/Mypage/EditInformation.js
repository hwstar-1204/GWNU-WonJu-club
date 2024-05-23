// import MypageNav from "./MypageNav.js";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Mypage_Style/Editinformation.css";

const Editinformation = () => {
  const location = useLocation();
  const userData = location.state ? location.state.userData : {}; 
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [study, setStudy] = useState(userData.study);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedUserData = {
            email: email,
            name: name,
            study: study,
            phone: phone,
            // student_id: 20191424,
            // grade: 4,
            // gender: '남자 ',
        };

        const response = await fetch('http://127.0.0.1:8000/club_account/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('수정 완료되었습니다.');
            window.location.replace('http://localhost:3000/mypage');
        } else {
            console.error('수정 실패:', data);
        }
    } catch (error) {
        console.error('네트워크 오류:', error);
    }
};



  return (
  <div className="my-page">

    <form classname = "edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">휴대전화:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="study">소속 학과:</label>
        <input
          type="text"
          id="study"
          value={study}
          onChange={(e) => setStudy(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">저장</button>
    </form>
  </div>
  );
};

export default Editinformation;
