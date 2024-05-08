// Header.js

import React from 'react';

const ClubHeader = () => {
  return (
    <div className="header">
      <img src="path/to/logo.png" alt="동아리 로고" />
      <h1>동아리 이름</h1>
      <ul className="categories">
        <li><a href="/members">회원</a></li>
        <li><a href="/gallery">갤러리</a></li>
        <li><a href="/board">게시판</a></li>
        <li><a href="/schedule">일정</a></li>
      </ul>
    </div>
  );
};

export default ClubHeader;