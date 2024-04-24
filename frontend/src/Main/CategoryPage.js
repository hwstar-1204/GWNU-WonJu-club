import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
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
            <Link to="/club-introduce" className="sub-menu-item">정규 동아리</Link>
            <Link to="/club-introduce" className="sub-menu-item">가입 동아리</Link>
            <Link to="/club-introduce" className="sub-menu-item">학습 동아리</Link>
            <Link to="/club-introduce" className="sub-menu-item">취업/창업 동아리</Link>
            <Link to="/club-introduce" className="sub-menu-item">소모임</Link>
          </div>
        )}
      </div>
      <div className="category-item">동아리 만들기</div>
      <div className="category-item">자유 게시판</div>
      <div className="category-item">동아리 관리</div>
    </div>
  );
}

export default CategoryPage;
