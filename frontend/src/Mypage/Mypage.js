import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';
import React, { useState, useEffect } from 'react';
import MypageHome from './MypageHome';
import './Mypage.css';
import '../Main/TopScreen.js'
import TopScreen from '../Main/TopScreen.js';
import axios from 'axios';


const MyPage = () => {
  const [profileImage, setprofileImage] = useState('');
  const [intro, setIntro] = useState('');
  const [myClub, setMyclub] = useState({
    logo: "club_logo_url_here.jpg",
      name: "나의 동아리",
      membershipLevel: "회원 등급"
  })

  const [userData, setUserData] = useState({
    name: "사용자 이름",
    email: "user@example.com",
    phone: "010-1234-5678",  
    study: "사용자 소속 학과",
    date_joined: "2024-04-16", // 가입날짜
    student_id: '20001000', // 학번
    grade: '4',   // 학년
    
    // profileImage: "profile_image_url_here.jpg",
    // intro: "소개글",  // 소개글
    // myClub: {

    //   logo: "club_logo_url_here.jpg",
    //   name: "나의 동아리",
    //   membershipLevel: "회원 등급"
    // }
  });

  useEffect(() => {
    fetchUserInfoFromServer()
      .then(userInfo => {
        setUserData(userInfo);
      })
      .catch(error => {
        console.error('Failed to fetch user info:', error);
      });
  }, []);
  
  const fetchUserInfoFromServer = async () => {
    try {
      const token = localStorage.getItem('token'); // 토큰 가져오기
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 헤더에 토큰 추가
        }
      };
      console.log(config);
      const response = await fetch('http://localhost:8000/club_account/user/', {
        method: 'GET',
        headers: config.headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };


  return (
    <div className="my-page">
      {/* TopScreen 컴포넌트를 사용하여 로그인 상태를 유지합니다. */}
      <TopScreen />
      <CategoryPage />
        <MypageNav userData={userData} />
        {/* 로그인 상태에 따라 마이페이지 화면을 표시합니다. */}
        <MypageHome userData={userData} />
    </div>

  );
};

export default MyPage;

