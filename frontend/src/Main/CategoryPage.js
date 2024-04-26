import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import { NavLink } from "react-router-dom";
import './CategoryPage.css';

const CategoryPage = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  return (
    <div className="category-container">
      <div 
        className="category-item" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        동아리 소개
        {isSubMenuVisible && (
          <div className="sub-menu">
            {/* 각 서브 메뉴 항목을 Link 컴포넌트로 감싸서 동아리 소개 페이지로 이동할 수 있는 링크를 추가합니다. */}
            <Link to="/club_introduce/club_list/" className="sub-menu-item">정규 동아리</Link>
            <Link to="/club_introduce/club_list/" className="sub-menu-item">가입 동아리</Link>
            <Link to="/club_introduce/club_list/" className="sub-menu-item">학습 동아리</Link>
            <Link to="/club_introduce/club_list/" className="sub-menu-item">취업/창업 동아리</Link>
            <Link to="/club_introduce/club_list/" className="sub-menu-item">소모임</Link>
          </div>
        )}
      </div>
      <NavLink to="/createclub" className="link-style">
        <div className="category-item">동아리 만들기</div>
      </NavLink>
      <div className="category-item">자유 게시판</div>
      <NavLink to="/createevent" className="link-style">
        <div className="category-item">이벤트</div>
      </NavLink>
    </div>
  );
}

export default CategoryPage;