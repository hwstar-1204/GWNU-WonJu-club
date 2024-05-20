import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './CategoryPage.css';

const CategoryPage = () => {
  return (
    <div className="category-container">

      <NavLink to="/club-introduce" className="category-item">동아리 소개</NavLink>
      <NavLink to="/create_club" className="category-item">동아리 만들기</NavLink>
      <NavLink to="/club_board" className="category-item">자유 게시판</NavLink>
      <NavLink to="/eventpage" className="category-item">이벤트</NavLink>
    </div>
  );
};

export default CategoryPage;
