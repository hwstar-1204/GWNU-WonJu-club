import React from 'react';
import { NavLink } from 'react-router-dom';
import './MypageNav.css';

const MypageNav = () => {
  return (
    <div className="my-category-container">
      <NavLink exact to="/mypage" className="my-category-item" activeClassName="active-link">홈</NavLink>
      <NavLink to="/editif" className="my-category-item" activeClassName="active-link">회원정보 수정</NavLink>
      <NavLink to="/change-password" className="my-category-item" activeClassName="active-link">비밀번호 변경</NavLink>
      <NavLink to="/myclub" className="my-category-item" activeClassName="active-link">내 동아리 관리</NavLink>
    </div>
  );
}

export default MypageNav;
