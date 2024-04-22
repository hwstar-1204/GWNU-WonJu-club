import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { NavLink as BootstrapNavLink } from 'react-bootstrap';
import './MypageNav.css';

const MypageNav = () => {
    return (
        <nav className="mypage-navigation">
            <ul>
                <li><RouterNavLink exact to="/mypage/home" activeClassName="active">홈</RouterNavLink></li>
                <li><RouterNavLink to="/edit-profile">회원정보 수정</RouterNavLink></li>
                <li><RouterNavLink to="/mypage/change-password">비밀번호 변경</RouterNavLink></li> {/* 수정된 부분 */}
                <li><BootstrapNavLink to="/club-management">동아리 관리</BootstrapNavLink></li>
            </ul>
        </nav>
    );
}

export default MypageNav;
