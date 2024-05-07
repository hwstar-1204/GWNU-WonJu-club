
import MypageNav from '../Mypage_Component/MypageNav';
import React, { useState } from 'react';
import MypageHome from '../Mypage_Component/MypageHome';
import '../Mypage_Style/Mypage.css';
import '../../Header/TopScreen'

const MyPage = () => {
  
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
    }
  });

  return (
    <div className="my-page">
      <div className="container">
        <MypageNav userData={userData} />
        {/* 로그인 상태에 따라 마이페이지 화면을 표시합니다. */}
        <MypageHome userData={userData} />
      </div>
    </div>

  );
};

export default MyPage;
