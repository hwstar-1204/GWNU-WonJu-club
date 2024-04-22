import React, { useState } from 'react';
import './MyPage.css';
import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';

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
    }
  });

  return (
    <div className="my-page">
      <CategoryPage />
      <MypageNav userData={userData} />
      <div className="user-info">
        <h1>{userData.name}의 페이지</h1>
        <div className="profile-image">
          <img src={userData.profileImage} alt="프로필 이미지" />
        </div>
        <div className="intro">
          <p>{userData.intro}</p>
        </div>
        <div className="email">
          <p>Email: {userData.email}</p>
        </div>
        <div className="phone">
          <p>Phone: {userData.phone}</p>
        </div>
        <div className="department">
          <p>Department: {userData.department}</p>
        </div>
        <div className="join-date">
          <p>Join Date: {userData.joinDate}</p>
        </div>
        <div className="club-info">
          <p>My Club: {userData.myClub.name}</p>
          <p>Membership Level: {userData.myClub.membershipLevel}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
