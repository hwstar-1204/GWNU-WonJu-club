import { Route,Routes, NavLink, Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopScreen from '../Main/TopScreen.js';
import CategoryPage from '../Main/CategoryPage';
import './Mypage.css';

import MypageHome from './MypageHome';
import Editinformation from './EditInformation.js';
import PasswordChangeForm from './ChangePassword.js';
import MyClubPage from './MyClubPage.js';


const MyPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // 데이터 로딩 
  // const [selectedPage, setSelectedPage] = useState('Home'); // 기본값으로 ComponentA 선택

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getUserDetails();
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

  // const handleNavigation = (page) => {
  //     setSelectedPage(page);
  // };


  return (
  <div className="my-page">
    <TopScreen/>
    <CategoryPage/>


    <div className="my-category-container">
      {/* 내비게이션 버튼 */}
      <div className='category_btn'>
        <Link to="" className="my-category-item" activeclassname="active-link">홈</Link>
        <NavLink to="/mypage/edit-information" className="my-category-item" activeclassname="active-link">회원정보 수정</NavLink>
        <NavLink to="/mypage/password-change" className="my-category-item" activeclassname="active-link">패스워드 변경</NavLink>
        <NavLink to="/mypage/my-club" className="my-category-item" activeclassname="active-link">내 동아리 관리</NavLink>
      </div>
    </div>  

    <MypageHome userData={userData} />

    <div>
      <Routes>
        <Route path="edit-information" element={<Editinformation />} />
        <Route path="password-change" element={<PasswordChangeForm />} />
        {/* <Route path="my-club" element={<MyClubPage />} /> */}
        {/* <Route path="" element={<MypageHome />} /> */}
      </Routes>
    </div>

  </div>  
  
  );
};

export default MyPage;

      
{/* <div className="my-category-container">
<div className='category_btn'>
  <button onClick={() => handleNavigation('Home')}>홈</button>
  <button onClick={() => handleNavigation('Editinformation')}>회원정보 수정</button>
  <button onClick={() => handleNavigation('PasswordChangeForm')}>패스워드 변경</button>  
</div>
<NavLink to="/myclub" className="my-category-item" activeclassname="active-link">내 동아리 관리</NavLink>
</div>
<MypageHome userData={userData} />

{selectedPage === 'Editinformation' && <Editinformation />}
{selectedPage === 'PasswordChangeForm' && <PasswordChangeForm />} */}