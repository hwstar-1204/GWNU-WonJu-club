import React from 'react';
import './MyPage.css';
import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';
import React, { useState } from 'react';
import MypageHome from './MypageHome';
import userData from './userData';

const Changepassword = () => {
  return (
    <div className="changepassword-page">
      <CategoryPage />
      <MypageNav userData={userData} />
      <MypageHome userData={userData} />
      <h1>비밀번호 변경</h1>
      <div>
        <p>현재 비밀번호:</p>
        <input type="text" placeholder="" />
      </div>
      <div>
        <p>현재 비밀번호 확인:</p>
        <input type="text" placeholder="" />
      </div>
      <div>
        <p>새 비밀번호:</p>
        <input type="text" placeholder="" />
      </div>
      <div>
        <p>새 비밀번호 확인:</p>
        <input type="text" placeholder="" />
      </div>
      <div className="button-container">
        <button className="password-button">비밀번호 변경</button>
        <button className="cancel-button">취소</button>
      </div>

    </div>

  );
};

export default Changepassword;
