import React from "react";
import {Image , NavLink } from "react-bootstrap";
import "../Club_Style/Club_head.css";
const ClubHeader = ({ clubName, clublogo, isPresident }) => {
  const handleMemberManagement = () => {
    // 사용자가 회장or부회장임을 식별하여 식별되면 동아리 관리 페이지로 이동 ( useNavigate 사용)
    // 해당 사항 없을 시 오류 메시지 ("회장 또는 부회장만 사용 가능합니다.") 출력

  };

  return (
    <div className="header-container">
      <NavLink to="/clubpage.clup.id" className="club-head">
       <div className="club-logo"><Image src = {clublogo}/></div>
      <div className="club-name">{clubName}</div>
      </NavLink>
      <div className="menu">
        <NavLink to="/cluppage.clup_id/members'" className="menu-item">회원정보</NavLink>
         <NavLink to="/cluppage.clup_id/gallery" className="menu-item">사진첩</NavLink>
         <NavLink to="/cluppage.clup_id/clup_board" className="menu-item">게시글</NavLink>
         <NavLink to="/cluppage.clup_id/schedule" className="menu-item">일정</NavLink>
        {isPresident && (
          <div className="menu-item" onClick={handleMemberManagement}>
            동아리관리
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubHeader;
