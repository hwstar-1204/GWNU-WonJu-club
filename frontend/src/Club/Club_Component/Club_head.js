import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Club_Style/Club_head.css'; // 스타일을 위한 CSS 파일

const ClubHeader = ({ clubName }) => {
  const navigate = useNavigate();

  const handleClick = (section) => {
    if (section === 'members') {
      navigate(`/club_information/club/${clubName}/members/`);
    } 
    else if (section === 'album') {
      navigate(`/club_information/club/${clubName}/albums/`);
    }
    else if (section === 'posts') {
      navigate(`/club_board/club_posts/?clubName=${clubName}`);
    }
    else if (section === 'event') {
      navigate(`/club_information/club/${clubName}/events/`);
    }
    else if (section === 'manage') {
      navigate(`/club_management/club/${clubName}/management/`);
    }
  };

  return (
    <div className="club-header">
      <img src="/path/to/logo.png" alt="Logo" style={{ width: '70px', height: '70px' }} />
      <h1>{clubName}</h1>
      <nav className='club-header-nav'>
        <ul>
          <li onClick={() => handleClick('members')}>회원정보</li>
          <li onClick={() => handleClick('posts')}>게시판</li>
          <li onClick={() => handleClick('album')}>사진첩</li>
          <li onClick={() => handleClick('event')}>일정</li>
        </ul>
        <li className="manage" onClick={() => handleClick('manage')}>동아리관리</li>
      </nav>
    </div>
  );
};

export default ClubHeader;
