import React, { useState, useEffect } from "react";
import { Image, NavLink } from "react-bootstrap";
import axios from "axios";
import "../Club_Style/Club_head.css";
import {LogoImage } from './StyledComponents'; 

const clubCategory = ({ clubname, isPresident }) => {
  const [clubInfo, setClubInfo] = useState(null);

  useEffect(() => {
    axios.get(`/club_information/club/${clubname}`)
      .then(response => {
        setClubInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching club info:", error);
      });
  }, [clubname]);

  const handleMemberManagement = () => {
    if (isPresident) {
      // 회장 또는 부회장이면 동아리 관리 페이지로 이동
      // 예를 들어, 이동 로직을 작성하거나, useNavigate 등을 사용하여 페이지 이동
    } else {
      // 회장 또는 부회장이 아닌 경우 오류 메시지 표시
      alert("회장 또는 부회장만 사용 가능합니다.");
    }
  };

return (
  
    <div className="header-container">
      {clubInfo && (
        <NavLink to={`/clubpage/${clubInfo.clubname}`} className="club-head">
          <div className="club-logo"><LogoImage src={clubInfo.clublogo} /></div>
          <div className="club-name">{clubInfo.clubname}</div>
        </NavLink>
      )}
      <div className="menu">
        <NavLink to={`/clubpage/${clubInfo.clubname}/members`} className="menu-item">회원정보</NavLink>
        <NavLink to={`/clubpage/${clubInfo.clubname}/gallery`} className="menu-item">사진첩</NavLink>
        <NavLink to={`/clubpage/${clubInfo.clubname}/club_board`} className="menu-item">게시글</NavLink>
        <NavLink to={`/clubpage/${clubInfo.clubname}/schedule`} className="menu-item">일정</NavLink>
        {isPresident && (
          <div className="menu-item" onClick={handleMemberManagement}>
            동아리관리
          </div>
        )}
      </div>
    </div>
  );
};

export default clubCategory;