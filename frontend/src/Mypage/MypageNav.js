import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';

    const MypageNav = () => {
        return (
            <nav className="mypage-navigation">
                <ul>
                    <li><NavLink exact to="/" activeClassName="active">홈</NavLink></li>
                    <li><NavLink to="/edit-profile">회원정보 수정</NavLink></li>
                    <li><NavLink to="/change-password">비밀번호 변경</NavLink></li>
                    <li><NavLink to="/club-management">동아리 관리</NavLink></li>
                </ul>
            </nav>
        );
    }

    export default MypageNav;