// MyPage.js

import React from 'react';
import { Container } from 'react-bootstrap';
import TopScreen from '../Main/TopScreen'; // TopScreen 컴포넌트를 가져옵니다.
import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';
import MypageHome from './MypageHome';


const MyPage = () => {
 

  // 더미 데이터
  const userData = {
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
    }
  };

  return (
    <div className="my-page">
      {/* TopScreen 컴포넌트를 사용하여 로그인 상태를 유지합니다. */}
      <TopScreen />
      <CategoryPage />
      <Container>
        <MypageNav userData={userData} />
        {/* 로그인 상태에 따라 마이페이지 화면을 표시합니다. */}
        <MypageHome userData={userData} />
      </Container>
    </div>
  );
};

export default MyPage;
