import { Route,Routes, NavLink, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage_Style/Mypage.css';
import MypageHome from './MypageHome.js';
import Editinformation from './EditInformation.js';
import PasswordChangeForm from './ChangePassword.js';
import MyClubPage from './MyClubPage.js';


const MyPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);
  const [myClubList, setMyClubList] = useState([]);

  const [loading, setLoading] = useState(true); // 데이터 로딩 
  // const [selectedPage, setSelectedPage] = useState('Home'); // 기본값으로 ComponentA 선택

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getUserDetails();
      fetchMyClubList();
    }
    
  }, [token]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/club_account/user/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const data = response.data;
      setUserData(data);
      
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyClubList = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/club_introduce/myclub_list/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      console.log(data.results);
      setMyClubList(data.results);

    } catch (error) {
      console.error('Error fetching my club list:', error);
    }
  };


  return (
  <div className="my-page">
    <div className="my-category-container">
      {/* 내비게이션 버튼 */}
      <div className='category_btn'>
        <Link to="" className="my-category-item" activeclassname="active-link">홈</Link>
        <NavLink to="/mypage/edit-information" className="my-category-item" activeclassname="active-link">회원정보 수정</NavLink>
        <NavLink to="/mypage/password-change" className="my-category-item" activeclassname="active-link">패스워드 변경</NavLink>
        <NavLink to="/mypage/my-club" className="my-category-item" activeclassname="active-link">내 동아리 관리</NavLink>
      </div>
    </div>  

    <MypageHome userData={userData} myClubList={myClubList} />

    <div>
      <Routes>
        <Route path="edit-information" element={<Editinformation />} />
        <Route path="password-change" element={<PasswordChangeForm />} />
        <Route path="my-club" element={<MyClubPage myClubList={myClubList} />} />
      </Routes>
    </div>

  </div>  
  
  );
};

export default MyPage;