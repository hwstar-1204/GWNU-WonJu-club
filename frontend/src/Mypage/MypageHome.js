import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from "react-bootstrap";
import { LogoImage } from './StyledComponents'; 

import "./Mypage_Style/MypageHome.css";
import defaultImage from "./profile.jpg";
import logo from "./logo.png";

const MypageHome = ({ userData }) => {
  console.log(userData);



  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md={4}>
          {/* 프로필 정보 패널 */}
          <div className="profile-panel">
            <h2 className="details-head">사용자 정보</h2>

            <img src={defaultImage} alt="프로필 사진" className="profile-image"/>
            <div className="details-info">
              <p><strong>이름: </strong> {userData?.name}</p>
              <p><strong>이메일: </strong> {userData?.email}</p>
              <p><strong>휴대전화: </strong> {userData?.phone}</p>
              <p><strong>학년:</strong> {userData?.grade}</p>
              <p><strong>학번:</strong> {userData?.student_id}</p>
              <p><strong>소속 학과:</strong> {userData?.study}</p>
              <p>{/* <strong>가입일:</strong> {userData?.date_joined} */}</p>
            </div>
          </div>
        </Col>

        <Col md={4}>
          <div className="myclub-panel">
            <h2 className="myclub-head">나의 동아리</h2>
            <LogoImage src={logo} alt="동아리 로고" className="club-logo"/>
            <div className="club-info">
              <p><strong>가입 동아리 이름</strong></p>
              <p><strong>등급</strong></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MypageHome;
