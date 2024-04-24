import React from 'react';
import './MyPage.css';
import React, { useState } from 'react';

const MypageHome = ({ userData }) => {
    return (
        <>
            {/* 내 정보 */}
            <div className="user-info">
                {/* 프로필 사진과 버튼 */}
                <div className="profile">
                    <img src={userData.profileImage} alt="프로필 사진" className="profile-image" />
                    <button className="edit-button">프로필 수정</button>
                    <button className="delete-button">사진 삭제</button>
                </div>

                {/* 사용자 정보 */}
                <div className="details">
                    <h2>사용자 정보</h2>
                    <p><strong>이름:</strong> {userData.name}</p>
                    <p><strong>이메일:</strong> {userData.email}</p>
                    <p><strong>휴대전화:</strong> {userData.phone}</p>
                    <p><strong>소속 학과:</strong> {userData.department}</p>
                    <p><strong>가입일:</strong> {userData.joinDate}</p>
                </div>
            </div>

            {/* 나의 동아리 */}
            <div className="my-club">
                <h2>나의 동아리</h2>
                <div className="club-details">
                    <img src={userData.myClub.logo} alt="동아리 로고" className="club-logo" />
                    <p className="club-name">{userData.myClub.name}</p>
                    <p className="membership-level">{userData.myClub.membershipLevel}</p>
                </div>
            </div>
        </>
    );
}

export default MypageHome;