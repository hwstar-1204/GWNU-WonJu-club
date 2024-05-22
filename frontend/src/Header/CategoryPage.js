import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CategoryPage.css';

const CategoryPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleCreateClubClick = () => {
    if (!isLoggedIn) {
      alert("회원만 사용할 수 있습니다. 로그인하시겠습니까?");
      navigate('/login'); // 로그인 페이지 경로가 '/login'이라고 가정
      return;
    }
    // 로그인이 되어 있다면 동아리 만들기 페이지로 이동
    navigate('/create_club');
  };

  return (
    <div className="category-container">
      <NavLink to="/club-introduce" className="category-item">동아리 소개</NavLink>
      <div onClick={handleCreateClubClick} className="category-item">동아리 만들기</div>
      <NavLink to="/club_board" className="category-item">자유 게시판</NavLink>
      <NavLink to="/eventpage" className="category-item">이벤트</NavLink>
    </div>
  );
};

export default CategoryPage;
