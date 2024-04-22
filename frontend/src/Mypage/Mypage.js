import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';
import React, { useState } from 'react';
import MypageHome from './MypageHome';
import './Mypage.css';
import '../Main/TopScreen.js'
import TopScreen from '../Main/TopScreen.js';


const MyPage = () => {
  // 더미 데이터
    const [userData, setUserData] = useState({
    profileImage: "profile_image_url_here.jpg",
    name: "사용자 이름",
    intro: "소개글",
    email: "user@example.com",
    phone: "010-1234-5678",
    department: "사용자 소속 학과",
    joinDate: "2024-04-16",
    myClub: {
      logo: "club_logo_url_here.jpg",
      name: "나의 동아리",
      membershipLevel: "회원 등급"
    }});

  return (
    
    
    <div className="my-page">
        <TopScreen />
        <CategoryPage />
        
         <h1 className = "mypage-header">마이페이지 </h1>
        <MypageNav userData={userData} />
        <MypageHome userData={userData} />

        </div>
      
  );
};

export default MyPage;

