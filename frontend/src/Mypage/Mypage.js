import { NavLink, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Mypage.css';
import TopScreen from '../Main/TopScreen.js';
import CategoryPage from '../Main/CategoryPage';
import Editinformation from './EditInformation.js';
import PasswordChangeForm from './ChangePassword.js';
import MypageHome from './MypageHome';


const MyPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // 데이터 로딩 
  const [selectedPage, setSelectedPage] = useState('Home'); // 기본값으로 ComponentA 선택

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

  const handleNavigation = (page) => {
      setSelectedPage(page);
  };


  return (
  <div className="my-page">
    <TopScreen/>
    <CategoryPage/>

    <div className="my-category-container">
      {/* <Link to="/editif" style={{ textDecoration: "none"}} state={{ userData: userData}} >유저 정보 수정</Link> */}
      {/* <NavLink to="/change-password" className="my-category-item" activeClassName="active-link">비밀번호 변경</NavLink> */}


      <div className='category_btn'>
        <button onClick={() => handleNavigation('Home')}>홈</button>
        <button onClick={() => handleNavigation('Editinformation')}>회원정보 수정</button>
        <button onClick={() => handleNavigation('PasswordChangeForm')}>패스워드 변경</button>  
      </div>
      <NavLink to="/myclub" className="my-category-item" activeClassName="active-link">내 동아리 관리</NavLink>
      </div>
      <MypageHome userData={userData} />


      {selectedPage === 'Editinformation' && <Editinformation />}
      {selectedPage === 'PasswordChangeForm' && <PasswordChangeForm />}
  </div>
  
  );
};

export default MyPage;




  // const [userData, setUserData] = useState({
  //   name: "사용자 이름",
  //   email: "user@example.com",
  //   phone: "010-1234-5678",  
  //   study: "사용자 소속 학과",
  //   date_joined: "2024-04-16", // 가입날짜
  //   student_id: '20001000', // 학번
  //   grade: '4',   // 학년
    
    // profileImage: "profile_image_url_here.jpg",
    // intro: "소개글",  // 소개글
    // myClub: {

    //   logo: "club_logo_url_here.jpg",
    //   name: "나의 동아리",
    //   membershipLevel: "회원 등급"
    // }
  // });