import React, { useState } from 'react';
import './CategoryPage.css';

const CategoryPage = () => {
  // 각 카테고리의 서브 메뉴 상태를 관리하기 위한 useState 훅 사용
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  // 마우스를 갖다대면 서브 메뉴를 보여주는 함수
  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  // 마우스를 벗어나면 서브 메뉴를 숨기는 함수
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
            <div className="sub-menu-item">정규 동아리</div>
            <div className="sub-menu-item">가동록 동아리</div>
            <div className="sub-menu-item">학습 동아리</div>
            <div className="sub-menu-item">취업/창업 동아리</div>
            <div className="sub-menu-item">소모임</div>
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
